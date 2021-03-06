class MessagesController < ApplicationController
  before_action :set_from_and_to_users, only: [:index, :create]

  def index
    messages = @from_user.messages_with(@to_user)
    render json: messages, each_serializer: MessageSerializer, root: false, :status => :ok
  end

  def create
    # replace IDs with actual objects
    message = Message.new(message_params.except(:from_user, :to_user).merge(from_user: @from_user, to_user: @to_user))
    begin
      message.save
      ActionCable.server.broadcast "messaging",
          { type: 'newMessage', id: message.id, from_user_id: message.from_user_id, to_user_id: message.to_user_id, body: message.body, created_at: message.created_at}
      render json: message, serializer: MessageSerializer, status: :created
    rescue ActiveRecord::NotNullViolation => error
      render json: error, status: :unprocessable_entity
    end
    
  end

  private
    def set_from_and_to_users
      # Use find_by so exceptions aren't thrown if not found
      @from_user = User.find_by(id: params[:from_user])
      @to_user = User.find_by(id: params[:to_user])

      if @from_user.nil? || @to_user.nil?
        error_text = @from_user.nil? ? 'Invalid from_username' : 'Invalid to_username'
        render json:{error: error_text}, :status => :not_found
      end
    end

    def message_params
      params.permit(:created_at, :body, :from_user, :to_user)
    end
end