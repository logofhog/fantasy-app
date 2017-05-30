class PlayersController < ApplicationController
  skip_before_filter :set_filter_options, only: [:replacement_players, :replacement_player]

  def index
    page = params[:page] || 0
    players = Player.all_players(options, page).as_json
    if options[:is_avg]
      players.each{|player| Player::STAT_CATEGORIES.each{|stat| player[stat] = '%.1f' % player[stat] if player[stat]}}
    end
    render json: {:players => players}
  end

  def search
    players = Player.search_by_partial(params[:name])
    render json: players
  end

  def show
    render json: player
  end

  def replacement_player position
    Player.replacement_player(position)
  end

  def replacement_players
    render json: {
      QB: Player.replacement_player('QB', options[:point_values], params[:qb][:offset]),
      RB: Player.replacement_player('RB', options[:point_values], params[:rb][:offset]),
      WR: Player.replacement_player('WR', options[:point_values], params[:wr][:offset]),
      TE: Player.replacement_player('TE', options[:point_values], params[:te][:offset])
    }
  end

  def season_total
    stats = player.season_total #add param for year
    render json: {player: player, stats: stats}
  end

  def by_week
    stats = player.week_stats(options[:point_values])
    render json: {player: player, stats: stats}
  end

  def replacement_player
    position = params[:position]
    render json: {player: Player.replacement_player(position, options[:point_values])}
  end

  def player
    Player.find(params[:id])
  end

  private

  def page
    params[:page] || 1
  end

end
