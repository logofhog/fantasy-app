class PlayersController < ApplicationController
  def index
    render json: {:player => "Matt Ryan"}
  end
end
