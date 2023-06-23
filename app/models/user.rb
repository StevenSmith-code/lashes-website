class User < ApplicationRecord
  has_secure_password
  attr_accessor :current_password
  attr_accessor :password_confirmation
  has_many :appointments
  has_many :services, through: :appointments
  validates :username, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_blank: true, on: :update
  validates :password, presence: true, length: { minimum: 6 }, confirmation: true, on: :create    
  validates :password_confirmation, presence: true, on: :create

end