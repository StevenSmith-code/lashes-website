class UserAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :created_at, :service

  def service
    {title: object.service.name, price: object.service.price}
  end
end