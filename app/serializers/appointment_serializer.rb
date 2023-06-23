class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :created_at
  belongs_to :service
end