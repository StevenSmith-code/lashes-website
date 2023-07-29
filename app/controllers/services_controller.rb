class ServicesController < ApplicationController
  before_action :set_service, only: [:show, :update, :destroy]
  wrap_parameters format: []
  skip_before_action :authorize, only: :create
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    services = Service.all
    render json: services
  end

  def show
    render json: @service
  end

  def create
    service = Service.create!(service_params)
    render json: service, status: :created
    
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
    params.permit(:name, :description, :price)
  end
end
