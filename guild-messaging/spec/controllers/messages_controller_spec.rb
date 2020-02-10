require "rails_helper"

RSpec.describe MessagesController, :type => :controller do
  describe "GET index" do
    it "has a 200 status code" do
      create(:user, username: 'user1')
      create(:user, username: 'user2')
      get :index, params: { from_user: 1, to_user: 2}
      expect(response.status).to eq(200)
    end

    it "returns 404 for an invalid user" do
      create(:user, username: 'user1')
      get :index, params: { from_user: 1, to_user: 2}
      expect(response.status).to eq(404)
    end
  end

  describe "POST create" do
    it "successfully creates a message, returning 201" do
      create(:user, username: 'user1')
      create(:user, username: 'user2')
      post :create, params: { from_user: 1, to_user: 2, body: 'test' }
      expect(response.status).to eq(201)
    end

    it "returns 422 for missing 'body' parameter" do
      create(:user, username: 'user1')
      create(:user, username: 'user2')
      post :create, params: { from_user: 1, to_user: 2 }
      expect(response.status).to eq(422)
    end

    it "returns 404 for invalid user id" do
      create(:user, username: 'user1')
      create(:user, username: 'user2')
      post :create, params: { from_user: 3, to_user: 2 }
      expect(response.status).to eq(404)
    end
  end
end