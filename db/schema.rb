# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 1) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_stats", id: false, force: :cascade do |t|
    t.string  "player_id",             limit: 30
    t.integer "gsis_id"
    t.integer "week",                  limit: 2
    t.string  "season_type",           limit: 20
    t.string  "team",                  limit: 5
    t.integer "passing_attempts",      limit: 2
    t.integer "passing_completions",   limit: 2
    t.integer "passing_tds",           limit: 2
    t.integer "passing_two_pt_at",     limit: 2
    t.integer "passing_two_pt_conv",   limit: 2
    t.integer "passing_int",           limit: 2
    t.integer "passing_sack",          limit: 2
    t.integer "passing_sack_yards",    limit: 2
    t.integer "passing_cmp_air_yds",   limit: 2
    t.integer "passing_yds",           limit: 2
    t.integer "passing_incmp",         limit: 2
    t.integer "punt_ret_yds",          limit: 2
    t.integer "punt_ret_tds",          limit: 2
    t.integer "punt_ret_total",        limit: 2
    t.integer "receiving_yds",         limit: 2
    t.integer "receiving_tar",         limit: 2
    t.integer "receiving_tds",         limit: 2
    t.integer "receiving_two_pt_att",  limit: 2
    t.integer "receiving_two_pt_made", limit: 2
    t.integer "receiving_yac",         limit: 2
    t.integer "receiving_rec",         limit: 2
    t.integer "rushing_att",           limit: 2
    t.integer "rushing_yds",           limit: 2
    t.integer "rushing_tds",           limit: 2
    t.integer "rushing_two_pt_att",    limit: 2
    t.integer "rushing_two_pt_made",   limit: 2
    t.integer "kick_ret_yds",          limit: 2
    t.integer "kick_ret_tds",          limit: 2
    t.integer "season_year",           limit: 2
  end

  create_table "games", primary_key: "gsis_id", force: :cascade do |t|
    t.string  "home_team",   limit: 5
    t.string  "away_team",   limit: 5
    t.integer "home_score",  limit: 2
    t.integer "away_score",  limit: 2
    t.integer "season_year", limit: 2
    t.string  "season_type", limit: 30
    t.integer "week",        limit: 2
  end

  create_table "players", id: false, force: :cascade do |t|
    t.string  "player_id",        limit: 30
    t.string  "gsis_name",        limit: 30
    t.string  "full_name",        limit: 30
    t.string  "first_name",       limit: 30
    t.string  "last_name",        limit: 30
    t.string  "team",             limit: 5
    t.string  "position",         limit: 5
    t.integer "profile_id"
    t.integer "uniform_number",   limit: 2
    t.string  "birthdate",        limit: 10
    t.string  "college",          limit: 30
    t.integer "height",           limit: 2
    t.integer "weight",           limit: 2
    t.integer "years_pro",        limit: 2
    t.string  "status",           limit: 30
    t.integer "sorting_score",    limit: 2
    t.integer "rz_sorting_score", limit: 2,  default: 0
  end

  create_table "rz_game_stats", id: false, force: :cascade do |t|
    t.string  "player_id",             limit: 30
    t.integer "gsis_id"
    t.integer "week",                  limit: 2
    t.string  "season_type",           limit: 20
    t.string  "team",                  limit: 5
    t.integer "passing_attempts",      limit: 2
    t.integer "passing_completions",   limit: 2
    t.integer "passing_tds",           limit: 2
    t.integer "passing_two_pt_at",     limit: 2
    t.integer "passing_two_pt_conv",   limit: 2
    t.integer "passing_int",           limit: 2
    t.integer "passing_sack",          limit: 2
    t.integer "passing_sack_yards",    limit: 2
    t.integer "passing_cmp_air_yds",   limit: 2
    t.integer "passing_yds",           limit: 2
    t.integer "passing_incmp",         limit: 2
    t.integer "punt_ret_yds",          limit: 2
    t.integer "punt_ret_tds",          limit: 2
    t.integer "punt_ret_total",        limit: 2
    t.integer "receiving_yds",         limit: 2
    t.integer "receiving_tar",         limit: 2
    t.integer "receiving_tds",         limit: 2
    t.integer "receiving_two_pt_att",  limit: 2
    t.integer "receiving_two_pt_made", limit: 2
    t.integer "receiving_yac",         limit: 2
    t.integer "receiving_rec",         limit: 2
    t.integer "rushing_att",           limit: 2
    t.integer "rushing_yds",           limit: 2
    t.integer "rushing_tds",           limit: 2
    t.integer "rushing_two_pt_att",    limit: 2
    t.integer "rushing_two_pt_made",   limit: 2
    t.integer "kick_ret_yds",          limit: 2
    t.integer "kick_ret_tds",          limit: 2
    t.integer "season_year",           limit: 2
  end

  create_table "teams", id: false, force: :cascade do |t|
    t.string "team_id", limit: 5
    t.string "city",    limit: 30
    t.string "name",    limit: 30
  end

end
