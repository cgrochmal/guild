import consumer from "./consumer"

/**
 * A list of callbacks to execute when an ActionCable message comes through.
 */
const subscriberCallbacks = []

/**
 * Initialize the websocket connection.
 */
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

/**
 * Components/services can use this to subscribe to AC messages.
 * @param {*} callback - internally maintained function to act on an AC message. Typically, it will check message fields to determine interest
 */
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

/**
 * calls all subscribed AC callbacks
 * @param {object} data - JSON message sent from the API
 */
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