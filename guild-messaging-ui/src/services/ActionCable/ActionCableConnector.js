import consumer from "./consumer"

const subscriberCallbacks = []

function initialize() {
  consumer.subscriptions.create(
    { 
      channel: "MessagingChannel" 
    },
    {
      connected: _handleConnected,
      disconnected: _handleDisconnected,
      received: _handleDataUpdate
    }
  )
}

function subscribe(callback) {
  // TODO: more sophisticated subscription mechanism
  subscriberCallbacks.push(callback)
}


function _handleConnected() {
  console.log("successfully connected to MessagingChannel")
}

function _handleDisconnected() {
  console.log("successfully disconnected from MessagingChannel")
}

function _handleDataUpdate(data) {
  console.log('data update received')
  for (let callback of subscriberCallbacks) {
    callback(data)
  }
}

export default {
  initialize,
  subscribe
}