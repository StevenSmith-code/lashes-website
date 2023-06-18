class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :service
  validates :start_time, presence: true
end
