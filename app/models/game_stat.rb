class GameStat < ActiveRecord::Base
  belongs_to :player
  self.primary_key = :gsis_id
end
