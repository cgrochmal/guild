require 'rails_helper'

RSpec.describe User, type: :model do
  it 'should get the correct message history between 2 users' do
    user1 = create(:user, username: 'user1')
    user2 = create(:user, username: 'user2')
    message = create(:message, from_user: user1, to_user: user2, body: 'test')
    user1_messages = user1.messages_with(user2)
    expect(user1_messages.size).to eq(1)
  end
end
