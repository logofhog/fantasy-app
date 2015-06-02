class TeamsController < ApplicationController

  def index
    render json: Team.all_teams
  end
end

