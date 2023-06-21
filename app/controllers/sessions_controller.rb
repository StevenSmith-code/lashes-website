class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create
    def create
        user = User.find_by(email: params[:email])  
        if user&.authenticate(params[:password]) 
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end  

    def show
        user = User.find_by(id: sessions[:user_id])

        if user
            render json: user, status: :ok
        else
            render json:{error: ["User not found"]}, status: :not_found
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
      end
end
