require 'rails_helper'

RSpec.describe Message, type: :model do
  it 'should return messages ordered by create date ASC' do
    user1 = create(:user, username: 'user1')
    user2 = create(:user, username: 'user2')
    message1 = create(:message, from_user: user1, to_user: user2, body: 'test1')
    message2 = create(:message, from_user: user1, to_user: user2, body: 'test2')
    message3 = create(:message, from_user: user1, to_user: user2, body: 'test3')
    expect(Message.all.first.body).to eq('test1')
  end
end
