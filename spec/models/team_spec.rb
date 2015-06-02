require 'spec_helper'

describe Team do
  it 'loads the teams from the yaml file' do
    expect(Team.all_teams.size).to eql(32)
  end
end
