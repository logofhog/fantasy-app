class Team < ActiveRecord::Base
  self.primary_key = 'team_id'
  has_many :players, foreign_key: 'team'
  has_many :games
  has_many :game_stats

  TEAMS = YAML::load_file("#{Rails.root}/lib/list_of_teams.yml")

  def self.all_teams
    TEAMS
  end

end
