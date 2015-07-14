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
      positions = options[:positions] || ['QB', 'RB', 'WR', 'TE']
      sort_by = options[:sort_by] || 'total_points'
      omit_weeks = options[:omit_weeks] || false

      query = "
      SELECT players.player_id, players.full_name, players.position,
      #{stats_query(stat)}, #{total_points(stat)}
      FROM players
      INNER JOIN #{red_zone}game_stats on players.player_id = #{red_zone}game_stats.player_id
      WHERE players.player_id IN (
      SELECT DISTINCT #{red_zone}game_stats.player_id FROM #{red_zone}game_stats) AND season_type= 'Regular' #{weeks(omit_weeks)}
      #{show_positions} AND season_year = #{season_year}
      GROUP BY players.player_id, players.full_name, players.position
      ORDER BY #{sort_by} DESC limit(25) offset(?);
      "

      records_array(query, page)
    end

    def records_array(query, page=0)
      ActiveRecord::Base.connection.execute(sanitize_sql([query, page]))
    end

    def total_points stat
      "round((
      #{stat}(passing_yds/#{POINT_MULTIPLES[:passing_yds]}) +
      #{stat}(passing_tds*#{POINT_MULTIPLES[:passing_tds]}) +
      #{stat}(passing_int*#{POINT_MULTIPLES[:passing_int]}) +
      #{stat}(rushing_yds/#{POINT_MULTIPLES[:rushing_yds]}) +
      #{stat}(rushing_tds*#{POINT_MULTIPLES[:rushing_tds]}) +
      #{stat}(receiving_yds/#{POINT_MULTIPLES[:receiving_yds]}) +
      #{stat}(receiving_tds*#{POINT_MULTIPLES[:receiving_tds]}) +
      #{stat}(receiving_rec/#{POINT_MULTIPLES[:receiving_rec]})
      )::numeric, 2) as total_points"
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
      return "#{stat}(#{property})" if stat == 'sum'
      "round(#{stat}(#{property})::numeric, 2)"
    end


    def weeks(weeks = false)
      "and week not in (#{weeks})" if weeks
    end

    def show_positions(positions = false)
      "and players.positions in #{positions}" if positions
    end
  end
end

