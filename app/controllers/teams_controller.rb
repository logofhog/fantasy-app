class TeamsController < ApplicationController

  def index
    render json: Team.all_teams
  end

  def show
    render json: {team: 'ATL'}
  end

  def players_by_week
    data = team.players_by_week
    render json: {data: data}
  end

  def weekly_totals
    render json: {data: team.totals}
  end

  def team
    Team.find(params[:id])
  end

  def all_offense
    render json: {teams: Team.all_offense}
  end

  def all_defense
    render json: {teams: Team.all_defense}
  end

  def te_defense
    render json: {teams: Team.defense_vs_player('TE', 1)}
  end

  def wr_defense
    render json: {teams: Team.defense_vs_player('WR', params[:rank])}
  end

end

