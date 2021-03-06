FantasyApp::Application.routes.draw do

  root 'home#index'

  get '/players', :to => 'players#index'
  get '/players/search', :to => 'players#search'
  get '/players/:id', :to => 'players#show'
  get '/players/:id/by_week', :to => 'players#by_week'
  get '/players/:id/season_total', :to => 'players#season_total'

  get '/teams', :to => 'teams#index'
  get '/teams/offense', :to => 'teams#all_offense'
  get '/teams/defense', :to => 'teams#all_defense'
  get '/teams/tedefense', :to => 'teams#te_defense'
  get '/teams/wrdefense', :to => 'teams#wr_defense'
  get '/teams/:id', :to => 'teams#show'
  get '/teams/:id/weekly_totals', :to => 'teams#weekly_totals'
  get '/teams/:id/players_by_week', :to => 'teams#players_by_week'

  get '/replacement_players', :to => 'players#replacement_players'

end

