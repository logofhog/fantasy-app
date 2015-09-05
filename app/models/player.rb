class Player < ActiveRecord::Base
  self.primary_key = :player_id
  has_many :game_stats
  has_many :teams, foreign_key: 'team'
  has_many :games, through: :game_stats, foreign_key: :gsis_id

  POINT_MULTIPLES = {
    :passing_yds  => 25.0,
    :passing_tds => 4.0,
    :passing_int => -1.0,
    :rushing_yds => 10.0,
    :rushing_tds => 6.0,
    :receiving_yds => 10.0,
    :receiving_tds => 6.0,
    :receiving_rec => 2.0
  }

  def week_stats
    stats = self.game_stats
    query = "
      select * from (
      select game_stats.*,
      rank() over
      (partition by game_stats.week order by #{Player.total_points} DESC) as ranked
      from players, game_stats where game_stats.player_id = players.player_id and
      players.position = (select position from players where player_id = '#{player_id}')
      ) as t1
      where t1.player_id = '#{player_id}'
    "
    res = Player.records_array(query)
  end

  def season_total
    query = "
      select #{Player.stats_query('sum')} from game_stats where game_stats.player_id = '#{player_id}'
    "
    Player.records_array(query)
  end

  class << self
    def all_players(options, page = 0)
      red_zone = options[:is_red_zone] ? 'rz_' : ''
      stat = options[:is_avg] ? 'avg' : 'sum'
      season_year = 2014
      positions = options[:positions].split(',') || ['QB', 'RB', 'WR', 'TE']
      positions = positions.map{ |p| "'" + p + "'" }.join(',')
      sort_by = options[:sort_by] || 'total_points'
      omit_weeks = options[:omit_weeks] || false

      query = "
      SELECT players.player_id, players.full_name, players.position, count(*) as games_played,
      #{stats_query(stat)}, #{total_points(stat)} as total_points
      FROM players
      INNER JOIN #{red_zone}game_stats on players.player_id = #{red_zone}game_stats.player_id
      WHERE players.player_id IN (
      SELECT #{red_zone}game_stats.player_id FROM #{red_zone}game_stats
      GROUP BY #{red_zone}game_stats.player_id HAVING count(#{red_zone}game_stats.player_id)> 10)
      AND season_type= 'Regular' #{weeks(omit_weeks)}
      #{show_positions(positions)} AND season_year = #{season_year}
      GROUP BY players.player_id, players.full_name, players.position
      ORDER BY #{sort_by} DESC limit(25) offset(?);
      "

      records_array(query, page)
    end

    def search_by_partial partial
      query = "SELECT players.full_name, players.player_id FROM players WHERE players.full_name ILIKE ?"
      records_array(query, "%#{partial}%")
    end

    def records_array(query, page=0)
      ActiveRecord::Base.connection.execute(sanitize_sql([query, page]))
    end

    def replacement_player position, season_year = 2014, offset = 20
      query = "
      SELECT avg(p.total_points) from (
      SELECT players.player_id, players.full_name, players.position,
      #{total_points('avg')} as total_points
      FROM players
      INNER JOIN game_stats on players.player_id = game_stats.player_id
      WHERE players.player_id IN (
      SELECT game_stats.player_id FROM game_stats
      GROUP BY game_stats.player_id HAVING count(game_stats.player_id)> 10)
      AND season_type= 'Regular'
      AND position = '#{position}' AND season_year = #{season_year}
      GROUP BY players.player_id, players.full_name, players.position
      ORDER BY total_points DESC LIMIT 5 OFFSET #{offset}
      ) AS p
      "
      result = records_array(query)
      round(result)
    end

    def round result
      result[0]["avg"].to_f.round(2)
    end

    def total_points stat = ''
      "round((
      #{stat}(passing_yds/#{POINT_MULTIPLES[:passing_yds]}) +
      #{stat}(passing_tds*#{POINT_MULTIPLES[:passing_tds]}) +
      #{stat}(passing_int*#{POINT_MULTIPLES[:passing_int]}) +
      #{stat}(rushing_yds/#{POINT_MULTIPLES[:rushing_yds]}) +
      #{stat}(rushing_tds*#{POINT_MULTIPLES[:rushing_tds]}) +
      #{stat}(receiving_yds/#{POINT_MULTIPLES[:receiving_yds]}) +
      #{stat}(receiving_tds*#{POINT_MULTIPLES[:receiving_tds]}) +
      #{stat}(receiving_rec/#{POINT_MULTIPLES[:receiving_rec]})
      )::numeric, 2)"
    end

    def stats_query stat
      "
      #{rounder(stat,'passing_yds')} as passing_yds,
      #{rounder(stat,'passing_tds')}  as passing_tds,
      #{rounder(stat,'passing_int')}  as passing_int,
      #{rounder(stat,'passing_attempts')}  as passing_attempts,
      #{rounder(stat,'passing_completions')}  as passing_completions,
      #{rounder(stat,'rushing_yds')} as rushing_yds,
      #{rounder(stat,'rushing_tds')}  as rushing_tds,
      #{rounder(stat,'rushing_att')}  as rushing_att,
      #{rounder(stat,'receiving_yds')}  as receiving_yds,
      #{rounder(stat,'receiving_tds')} as receiving_tds,
      #{rounder(stat,'receiving_rec')}  as receiving_rec,
      #{rounder(stat,'receiving_tar')}  as receiving_tar
      "
    end

    def rounder stat, property
      return property if !stat
      return "#{stat}(#{property})" if stat == 'sum'
      "round(#{stat}(#{property})::numeric, 2)"
    end

    def weeks(weeks = false)
      "and week not in (#{weeks})" if weeks
    end

    def show_positions(positions = false)
      "and position in (#{positions})" if positions
    end
  end
end

