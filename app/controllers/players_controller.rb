class PlayersController < ApplicationController
  def index
    render json: {:players => Player.all_players(options)}
  end

  def show
    render json: player
  end

  def season_total
    stats = player.season_total #add param for year
    render json: {player: player, stats: stats}
  end

  def by_week
    stats = player.week_stats
    render json: {player: player, stats: stats}
  end

  private

  def player
    Player.find(params[:id])
  end

  def page
    params[:page] || 1
  end

  def options
    {
    :is_red_zone => params[:is_red_zone] || false,
    :omit_weeks  => params[:omit_weeks],
    :positions    => params[:positions],
    :is_avg      => params[:is_avg] || false,
    :sort_by     => params[:sort_by]
    }
  end
end
