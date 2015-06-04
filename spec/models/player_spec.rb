require 'spec_helper'

describe Player do
  it 'queries for all players' do
    Player.stub(:records_array).and_return('players!')
    expect(Player.all_players({})).to eql('players!')
  end
  it 'queries for one player' do
    player = Player.new
    expect(player.week_stats.to_a).to eql([])
  end
end
