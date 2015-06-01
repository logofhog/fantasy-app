class Player < ActiveRecord::Base
  self.primary_key = :player_id

  POINT_MULTIPLES = {
    :passing_yds  => 25,
    :passing_tds => 4,
    :passing_int => -1,
    :rushing_yds => 10,
    :rushing_tds => 6,
    :receiving_yds => 10,
    :receiving_tds => 6,
    :receiving_rec => 2
  }

  class << self
    def all_players(options, page = 0)


      red_zone = options[:is_red_zone] ? 'rz_' : ''
      stat = options[:is_sum] ? 'sum' : 'avg'
      season_year = 2014
      positions = options[:positions] || ['QB', 'RB', 'WR', 'TE']
      sort_by = options[:sort_by] || 'total_points'
      omit_weeks = options[:omit_weeks] || [-1]

      query = "
      select players.player_id, players.full_name, players.position,
      #{stats_query(stat)} (
      #{stat}(passing_yds/#{POINT_MULTIPLES[:passing_yds]}) +
      #{stat}(passing_tds*#{POINT_MULTIPLES[:passing_tds]}) +
      #{stat}(passing_int*#{POINT_MULTIPLES[:passing_int]}) +
      #{stat}(rushing_yds/#{POINT_MULTIPLES[:rushing_yds]}) +
      #{stat}(rushing_tds*#{POINT_MULTIPLES[:rushing_tds]}) +
      #{stat}(receiving_yds/#{POINT_MULTIPLES[:receiving_yds]}) +
      #{stat}(receiving_tds*#{POINT_MULTIPLES[:receiving_tds]}) +
      #{stat}(receiving_rec/#{POINT_MULTIPLES[:receiving_rec]}))
      as total_points
      from players
      inner join #{red_zone}game_stats on players.player_id = #{red_zone}game_stats.player_id
      where players.player_id in (
      select distinct #{red_zone}game_stats.player_id from #{red_zone}game_stats) and season_type= 'Regular' #{weeks}
      #{show_positions} and season_year = #{season_year}
      group by players.player_id, players.full_name, players.position
      order by #{sort_by} desc limit(25) offset(?);
      "

      records_array(query, page)
    end

    private

    def records_array(query, page)
      ActiveRecord::Base.connection.execute(sanitize_sql([query, page]))
    end

    def stats_query stat
      "
      #{stat}(passing_yds) as passing_yds,
      #{stat}(passing_tds) as passing_tds,
      #{stat}(passing_int) as passing_int,
      #{stat}(passing_attempts) as passing_attempts,
      #{stat}(passing_completions) as passing_completions,
      #{stat}(rushing_yds) as rushing_yds,
      #{stat}(rushing_tds) as rushing_tds,
      #{stat}(rushing_att) as rushing_att,
      #{stat}(receiving_yds) as receiving_yds,
      #{stat}(receiving_tds) as receiving_tds,
      #{stat}(receiving_rec) as receiving_rec,
      #{stat}(receiving_tar) as receiving_tar,
      "
    end

    def weeks(weeks = false)
      "and week not in #{weeks}" if weeks
    end

    def show_positions(positions = false)
      "and players.positions in #{positions}" if positions
    end

  end

end
