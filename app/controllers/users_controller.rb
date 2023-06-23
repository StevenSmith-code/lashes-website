class UsersController < ApplicationController
  wrap_parameters format: []
  skip_before_action :authorize, only: :create
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    def index
        users = User.all
        render json: users, each_serializer: UserSerializer
    end
    
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, serializer: UserSerializer
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end
    
    def create
        user = User.create!(user_params)
        byebug
        render json: user, status: :created  
    end
    
    def update
        user = User.find(params[:id])
        if user.authenticate(params[:currentPassword])
          if user.update(username: params[:username], email: params[:email], password: params[:password])
            render json: user, serializer: UserSerializer, status: :ok
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: "Invalid current password" }, status: :unprocessable_entity
        end
      end
      
      
    
    def destroy
        user = User.find(params[:id])
        user.destroy
        render json: { message: "User deleted successfully" }, status: :no_content
    end
    
    private

    def render_unprocessable_entity_response(invalid)
      render json: { errors: invalid.record.errors }, status: :unprocessable_entity
    end
    
    def user_params
        params.permit(:username, :email, :password, :current_password, :password_confirmation)
      end
      
end
