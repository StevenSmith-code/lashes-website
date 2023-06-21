class User < ApplicationRecord
    has_secure_password
    attr_accessor :current_password
    has_many :appointments
    has_many :services, through: :appointments
    validates :username, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, allow_blank: true, on: :update

end
