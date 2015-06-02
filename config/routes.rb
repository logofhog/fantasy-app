FantasyApp::Application.routes.draw do

  root 'home#index'

  get '/players', :to => 'players#index'
  get '/players/:id', :to => 'players#show'

  get '/teams', :to => 'teams#index'

end

