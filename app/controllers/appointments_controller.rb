class AppointmentsController < ApplicationController
  before_action :get_appointment, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    appointments = Appointment.all
    render json: appointments
  end

  def show
    render json: @appointment
  end

  def create
    appointment = Appointment.new(appointment_params)
    appointment.create!(appointment_params)
    render json: appointment
   
  end

  def update
     @appointment.update(appointment_params)
      render json: @appointment
  
  end

  def destroy
    @appointment.destroy
    render json: { message: "Appointment deleted successfully" }
  end

  private

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors }, status: :unprocessable_entity
  end

  def get_appointment
    @appointment = Appointment.find(params[:id])
  end

  def appointment_params
    params.permit(:user_id, :title, :service_id, :start_time)
  end

end
