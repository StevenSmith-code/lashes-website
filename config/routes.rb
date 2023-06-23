Rails.application.routes.draw do
  resources :services
  resources :appointments
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/user", to: "users#show"
  get "/profile/:id", to: "sessions#show"
  patch "/profile/:id", to: "users#update"
end
