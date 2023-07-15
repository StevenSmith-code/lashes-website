class UserServiceSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
end
