Rails.application.routes.draw do
  resources :messages, only: [:index]
  resource :message, only: [:create]

  resources :users, only: [:index]
end
