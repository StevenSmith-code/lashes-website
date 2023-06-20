class UsersController < ApplicationController
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
        render json: user, status: :created
        
    end
    
    def update
        user = User.find(params[:id])
        render json: user, status: :ok
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
        params.require(:user).permit(:name, :email, :password)
    end 
end
