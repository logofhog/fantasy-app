class PlayersController < ApplicationController
  def index
    render json: {:players => Player.all_players(options)}
  end

  def show
    player = Player.find(params[:id])
    render json: player
  end

  private

  def page
    params[:page] || 1
  end

  def options
    {
    :is_red_zone => params[:is_red_zone] || false,
    :omit_weeks  => params[:omit_weeks],
    :position    => params[:position],
    :is_sum      => params[:is_sum] || true,
    :sort_by     => params[:sort_by]
    }
  end
end