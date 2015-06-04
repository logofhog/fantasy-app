FantasyApp::Application.routes.draw do

  root 'home#index'

  get '/players', :to => 'players#index'
  get '/players/:id', :to => 'players#show'
  get '/players/:id/by_week', :to => 'players#by_week'
  get '/players/:id/season_total', :to => 'players#season_total'

  get '/teams', :to => 'teams#index'

end

