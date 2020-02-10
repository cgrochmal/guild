class User < ApplicationRecord

  def messages_with(user)
    # Originally used IN query for better performance, but that could incorrectly return messages sent to yourself (a potential future enhancement)
    # Message.where(:from_user => [self, user], :to_user => [self, user])

    Message.where(from_user: self, to_user: user).or(Message.where(from_user: user, to_user: self))
  end
end