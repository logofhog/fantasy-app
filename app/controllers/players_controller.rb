class PlayersController < ApplicationController
  def index
    render json: {:players => Player.all_players(options)}
  end

  def show
    render json: player
  end

  def replacement_player position
    Player.replacement_player(position)
  end

  def replacement_players
    render json: {
      QB: Player.replacement_player('QB', 2014, params[:qb][:offset]),
      RB: Player.replacement_player('RB', 2014, params[:rb][:offset]),
      WR: Player.replacement_player('WR', 2014, params[:wr][:offset]),
      TE: Player.replacement_player('TE', 2014, params[:te][:offset])
    }
  end

  def season_total
    stats = player.season_total #add param for year
    render json: {player: player, stats: stats}
  end

  def by_week
    stats = player.week_stats
    render json: {player: player, stats: stats}
  end

  def replacement_player
    position = params[:position]
    render json: {player: Player.replacement_player(position)}
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
    :positions    => params[:positions] || "QB,RB,WR,TE",
    :is_avg      => params[:is_avg] || false,
    :sort_by     => params[:sort_by]
    }
  end
end
