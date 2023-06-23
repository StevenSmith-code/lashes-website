class Service < ApplicationRecord
    has_many :appointments, dependent: :destroy
    has_many :users, through: :appointments
    validates :name, presence: true
    validates :price, presence: true, numericality: { greater_than: 0 }
end