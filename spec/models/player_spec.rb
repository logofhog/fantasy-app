require 'spec_helper'

describe Player do
  it 'works' do
    Player.stub(:records_array).and_return('players!')
    expect(Player.all_players({})).to eql('players!')
  end
end
