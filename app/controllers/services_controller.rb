class ServicesController < ApplicationController
  before_action :set_service, only: [:show, :update, :destroy]

  def index
    services = Service.all
    render json: services
  end

  def show
    render json: @service
  end

  def create
    service = Service.new(service_params)
    if service.save
      render json: service
    else
      render json: { error: service.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @service.update(service_params)
      render json: @service
    else
      render json: { error: @service.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @service.destroy
    @service.appointments.destroy_all
    render json: { message: "Service deleted successfully" }
  end

  def users_with_appointments
    service = Service.find(params[:id])
    users = service.users

    render json: users, each_serializer: UserServiceSerializer
  end

  private

  def set_service
    @service = Service.find(params[:id])
  end

  def service_params
    params.require(:service).permit(:name, :price)
  end
end
