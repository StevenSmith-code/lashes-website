class AppointmentsController < ApplicationController
    before_action :set_appointment, only: [:show, :update, :destroy]
  
    def index
      appointments = Appointment.all
      render json: appointments
    end
  
    def show
      render json: @appointment
    end
  
    def create
      appointment = Appointment.new(appointment_params)
      if appointment.save
        render json: appointment
      else
        render json: { error: appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      if @appointment.update(appointment_params)
        render json: @appointment
      else
        render json: { error: @appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @appointment.destroy
      render json: { message: "Appointment deleted successfully" }
    end
  
    private
  
    def set_appointment
      @appointment = Appointment.find(params[:id])
    end
  
    def appointment_params
      params.require(:appointment).permit(:user_id, :service_id, :start_time)
    end
  end
  