Messaging App

 Setup
 ====
 *from the guild-messaging directory*
 1. ensure ruby, rails, and sqlite3 are installed as per [this guide](https://guides.rubyonrails.org/getting_started.html)
 2. `bundle install`
 3. `rake db:setup`
 *with the API server running, open a new terminal in guild-messaging-ui*
 1. npm install
 2. npm start
 
 The app should now be visible at localhost:3001

Issues
	- the contract for GET /messages is misleading. It retrieves messages to or from both users, but the parameters imply that only a one-way message history will be retrieved. This could be remedied through use of a session token to track current user, and then something like GET /messages_with?user={}. A quicker solution would be to change the parameters to something like user1 and user2, but I kept it as-is to simplify implementation.

Basic idea (MVP implementation): use Rails' ActionCable module to send new messages to the client via Websocket
	- select user to log in as (via dropdown or list selection)
	- Select user to chat with 
	- brought to chat window, any existing messages retrieved, and able to send new messages

Schema:
	Users
	 - id (int)
	 - username (text, index)
	 - created_at (timestamp)
	 - updated_at (timestamp)

	Messages
	 - id (int)
	 - body (text)
	 - from_user_id (int, foreign key)
	 - to_user_id (int, foreign key)
	 - created_at (timestamp)
	 - updated_at (timestamp)

Endpoints:
	GET /messages?from_user={}&to_user={}

	POST /message
		{
			created_at: Timestamp
			body: String,
			from_user: Number,
			to_user: Number
		}


Future Enhancements:
 - more robust architecture: use Kafka or RabbitMQ to handle higher loads
	- interact with Kafka/RabbitMQ consumer service though websocket
 - ability to send images/files (websocket message gives info needed to download)
 - Integrate Redis for caching recent messages (increased scalability)
 - Expiry Mechanism to store old/archived messages in a separate table or Database (something like Cassandra)
 - Horizontally scale app/API servers through cloud infrastructure (AWS autoscaling etc)
 - integrate with Rails paranoia/acts_as_paranoid to support soft-deletes of messages
 - implement authentication and session management (JWT representation of current user)
 - other security enhancements (CORS, etc)
 - pagination/infinite scroll in chat window
 - Chats Table (user-user chat sessions) used to populate all pre-existing chats
 - ability to edit recent messages
 - read receipts
 - Error Handling
