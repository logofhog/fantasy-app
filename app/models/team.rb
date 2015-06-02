class Team < ActiveRecord::Base
  primary_key = :team_id
  TEAMS = YAML::load_file("#{Rails.root}/lib/list_of_teams.yml")

  def self.all_teams
    TEAMS
  end

end
