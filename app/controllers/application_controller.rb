class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :set_filter_options

  def set_filter_options
    options
  end

  def options
    @options ||= {
      :is_red_zone => options_params[:is_red_zone] == 'true',
      :omit_weeks  => params[:omit_weeks],
      :positions    => positions_params,
      :is_avg      => params[:avg] == 'true',
      :sort_by     => params[:sort_by],
      :point_values => point_value_params
    }
    set_cookies if params[:point_values]
    @options
  end

  def set_cookies
    cookies[:point_values] = point_value_params.to_json
  end

  def point_value_params
    if params[:point_values]
      Player::POINT_MULTIPLES.with_indifferent_access.merge(options_params[:point_values].select do |stat, _|
        Player::POINT_MULTIPLES.keys.include?(stat.to_sym)
      end)
    elsif cookies[:point_values]
      JSON.parse(cookies[:point_values]).with_indifferent_access
    else
      Player::POINT_MULTIPLES
    end
  end

  def positions_params
    return ['QB', 'WR', 'RB', 'TE'] unless options_params[:positions]
    options_params[:positions].select{|_, present| present == 'true'}.keys
  end

  def options_params
    params.permit(:is_red_zone,
                  :avg,
                  :sum,
                  {positions: ['QB', 'WR', 'RB', 'TE']},
                  {point_values: [:passing_yds, :passing_tds, :rushing_yds, :rushing_tds, :receiving_yds, :receiving_tds, :receiving_rec]}
                 )
  end
end
