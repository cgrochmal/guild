class MessagingChannel < ApplicationCable::Channel
  # TODO: break channel up so everyone does not receive every update
  # perhaps on a per-user basis
  def subscribed
    puts 'new subscription to messaging channel!'
    stream_from 'messaging'
  end
end