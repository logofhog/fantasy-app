class Player < ActiveRecord::Base
  self.primary_key = :player_id
  has_many :game_stats
  has_many :teams, foreign_key: 'team'
  has_many :games, through: :game_stats, foreign_key: :gsis_id

  PAGE_SIZE = 25
  POINT_MULTIPLES = {
    :passing_yds  => 25.0,
    :passing_tds => 4.0,
    :passing_int => -1.0,
    :rushing_yds => 10.0,
    :rushing_tds => 6.0,
    :receiving_yds => 10.0,
    :receiving_tds => 6.0,
    :receiving_rec => 0.0
  }

  STAT_CATEGORIES = [
    "top_one",
    "top_five",
    "top_ten",
    "top_fifteen",
    "top_twentyfive",
    "passing_yds",
    "passing_tds",
    "passing_attempts",
    "passing_completions",
    "passing_int",
    "rushing_yds",
    "rushing_tds",
    "rushing_att",
    "receiving_yds",
    "receiving_rec",
    "receiving_tds",
    "receiving_tar",
    "total_points"
  ]

  def week_stats(point_values)
    stats = self.game_stats
    query = "
      select * from (
      select game_stats.*,
      rank() over
      (partition by game_stats.week order by #{Player.total_points(point_values)} DESC) as ranked
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
      positions = options[:positions].map{ |p| "'" + p + "'" }.join(',')
      sort_by = options[:sort_by] || 'total_points'
      omit_weeks = options[:omit_weeks] || false
      point_values = options[:point_values]

      query = """
    select
        round(stddev(ranking)::numeric, 2) as std_dev,
        round(avg(ranking)::numeric, 3) as avg_rank,
        player_id,
        full_name,
        position,
        #{stat}(top_one) as top_one,
        #{stat}(top_five) as top_five,
        #{stat}(top_ten) as top_ten,
        #{stat}(top_fifteen) as top_fifteen,
        #{stat}(top_twentyfive) as top_twentyfive,
        #{stat}(passing_yds) as passing_yds,
        #{stat}(passing_tds) as passing_tds,
        #{stat}(passing_attempts) as passing_attempts,
        #{stat}(passing_completions) as passing_completions,
        #{stat}(passing_int) as passing_int,
        #{stat}(rushing_yds) as rushing_yds,
        #{stat}(rushing_tds) as rushing_tds,
        #{stat}(rushing_att) as rushing_att,
        #{stat}(receiving_yds) as receiving_yds,
        #{stat}(receiving_rec) as receiving_rec,
        #{stat}(receiving_tds) as receiving_tds,
        #{stat}(receiving_tar) as receiving_tar,
        #{total_points(point_values, stat)}
         as total_points,
        count(*) as games_played
    from (
    select
    players.full_name as full_name,
    players.position as position,
    players.player_id as player_id,
    t1.ranked as ranking,
    case
      when t1.ranked < 2 then 1
    end as top_one,
    case
      when t1.ranked < 6 then 1
    end as top_five,
    case
      when t1.ranked < 11 then 1
    end as top_ten,
    case
      when t1.ranked < 11 then 1
    end as top_fifteen,
    case
      when t1.ranked < 26 then 1
    end as top_twentyfive,
    t1.week,
    t1.passing_yds as passing_yds,
    t1.passing_tds as passing_tds,
    t1.passing_int as passing_int,
    t1.passing_attempts as passing_attempts,
    t1.passing_completions as passing_completions,
    t1.rushing_yds as rushing_yds,
    t1.rushing_tds as rushing_tds,
    t1.rushing_att as rushing_att,
    t1.receiving_yds as receiving_yds,
    t1.receiving_rec as receiving_rec,
    t1.receiving_tds as receiving_tds,
    t1.receiving_tar as receiving_tar
    from (
      select players.full_name, players.position, game_stats.*,
      rank() over
        (partition by game_stats.week, players.position order by round((
      (passing_yds/#{point_values[:passing_yds]}) +
      (passing_tds*#{point_values[:passing_tds]}) +
      (passing_int*#{point_values[:passing_int]}) +
      (rushing_yds/#{point_values[:rushing_yds]}) +
      (rushing_tds*#{point_values[:rushing_tds]}) +
      (receiving_yds/#{point_values[:receiving_yds]}) +
      (receiving_tds*#{point_values[:receiving_tds]}) +
      (receiving_rec*#{point_values[:receiving_rec]})
        )::numeric, 2) desc)
      as ranked
      from players, game_stats where game_stats.player_id = players.player_id
      #{weeks(omit_weeks)} #{show_positions(positions)}
      and players.player_id in (select game_stats.player_id from game_stats
      group by game_stats.player_id having count(game_stats.player_id)>4)
      ) as t1, players
      where t1.player_id = players.player_id
      ) as with_ranking
      group by position, full_name, player_id order by total_points desc limit #{PAGE_SIZE} offset ?
      """
      records_array(query, page)
    end

    def search_by_partial partial
      query = "SELECT players.full_name, players.player_id FROM players WHERE players.full_name ILIKE ? order by sorting_score desc;"
      ActiveRecord::Base.connection.execute(sanitize_sql([query, "%#{partial}%"]))
    end

    def records_array(query, page=0)
      offset = page.to_i * PAGE_SIZE
      ActiveRecord::Base.connection.execute(sanitize_sql([query, offset]))
    end

    def replacement_player position, point_values, offset = 20
      total_points_query = total_points(point_values, 'avg')
      query = "
      select
        full_name,
        #{total_points_query} as total_points
      from game_stats, player
      where player.position = '#{position}' and game_stats.player_id = player.player_id
      group by player.full_name, player.position HAVING count(game_stats.player_id)> 12
      order by total_points desc limit 1 offset #{offset}
      "
      result = records_array(query)
      round(result)
    end

    def round result
      result[0]["total_points"].to_f.round(2)
    end

    def total_points point_values, stat = ''
      "round((
      cast(#{stat}(passing_yds) as float)/#{point_values[:passing_yds]} +
      cast(#{stat}(passing_tds) as float)*#{point_values[:passing_tds]} +
      cast(#{stat}(passing_int) as float)*#{point_values[:passing_int]} +
      cast(#{stat}(rushing_yds) as float)/#{point_values[:rushing_yds]} +
      cast(#{stat}(rushing_tds) as float)*#{point_values[:rushing_tds]} +
      cast(#{stat}(receiving_yds) as float)/#{point_values[:receiving_yds]} +
      cast(#{stat}(receiving_tds) as float)*#{point_values[:receiving_tds]} +
      cast(#{stat}(receiving_rec) as float)*#{point_values[:receiving_rec]}
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

