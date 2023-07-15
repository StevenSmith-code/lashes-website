Rails.application.routes.draw do
  resources :services do
    get 'users_with_appointments', on: :member
  end
  resources :appointments
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/user", to: "users#show"

end
