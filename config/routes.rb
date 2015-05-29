FantasyApp::Application.routes.draw do

  root 'home#index'

  get '/players', :to => 'players#index'

end

