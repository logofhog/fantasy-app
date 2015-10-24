class Team < ActiveRecord::Base
  self.primary_key = 'team_id'
  has_many :players, foreign_key: 'team'
  has_many :games
  has_many :game_stats

  TEAMS = YAML::load_file("#{Rails.root}/lib/list_of_teams.yml")

  def totals
    stat = 'sum'
    query = "
      SELECT players.player_id, players.full_name, players.position, #{stats_query(stat)}
      FROM players
      INNER JOIN game_stats ON players.player_id = game_stats.player_id
      WHERE players.team = '#{team_id}'
      GROUP BY players.full_name, players.player_id, players.position
      "
    Team.run_query(query)
  end

  def players_by_week
    query = "
      SELECT players.full_name, players.player_id, players.position, game_stats.*
      FROM players
      INNER JOIN game_stats ON players.player_id = game_stats.player_id
      WHERE players.team = '#{team_id}'
    "

    Team.run_query(query)
  end

  def self.run_query query
    ActiveRecord::Base.connection.execute(sanitize_sql([query]))
  end

  def self.all_teams
    TEAMS
  end

  def self.all_defense
    query = "
    select *, (passing_points + rushing_points + receiving_points) as total_points from (
    select opponent,
    count(distinct gsis_id) as games_played,
    sum(passing_yds) as passing_yds,
    sum(passing_tds) as passing_tds,
    round((sum(passing_tds)*6) + (sum(passing_yds)/30.0)::numeric, 2) as passing_points,
    round((sum(rushing_tds)*6) + (sum(rushing_yds)/10.0)::numeric, 2) as rushing_points,
    round((sum(receiving_tds)*6) + (sum(receiving_yds)/15.0)::numeric, 2) as receiving_points,
    sum(rushing_yds) as rushing_yds,
    sum(rushing_tds) as rushing_tds,
    sum(receiving_yds) as receiving_yds,
    sum(receiving_tds) as receiving_tds
    from game_stats group by opponent order by opponent
    ) t order by total_points
    "
    Team.run_query(query)
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
    #{stat}(receiving_tar) as receiving_tar
    "
  end

end
