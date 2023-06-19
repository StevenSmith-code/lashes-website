# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# Create users
user1 = User.create(username: "John Doe", email: "john@example.com", password: "password")
user2 = User.create(username: "Jane Smith", email: "jane@example.com", password: "password")

# # Create services
service1 = Service.create(name: "Classic Eyelash Extensions", description: "Adds length and volume to natural lashes", price: 50.00)
service2 = Service.create(name: "Volume Eyelash Extensions", description: "Creates a fuller and more dramatic look", price: 80.00)

# # Create appointments
appointment1 = Appointment.create(user: user1, service: service1, start_time: DateTime.now + 1.day)
appointment2 = Appointment.create(user: user2, service: service2, start_time: DateTime.now + 2.days)
