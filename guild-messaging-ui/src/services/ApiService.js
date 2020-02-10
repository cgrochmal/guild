// TODO: split into separate services (userService, messageService) as app grows

/**
 *  This is hard-coded for this assignment, but in a real-world scenario would use
 *  an environment variable set by the build (or overwritten by the developer)
*/ 
const apiBaseUri = 'http://localhost:3000'

/**
 * Get all users in the system. Obviously in the real world this would be a super-admin only action.
 */
async function getUsers() {
  const response = await fetch(apiBaseUri + '/users')
  return response.json()
}

// note: 
/**
 * Get message history between 2 users. Swapping fromUserId and toUserId will have identical results.
 * @param {number} fromUserId - one user in the chat
 * @param {number} toUserId - the other user in the chat
 */
async function getChatHistory(fromUserId, toUserId) {
  const response = await fetch(`${apiBaseUri}/messages?from_user=${fromUserId}&to_user=${toUserId}`)
  return response.json()
}

/**
 * Send a chat message
 * @param {object} message - must have created_at (date), from_user (int),to_user(int), and body(string)
 */
async function sendMessage(message) {
  const response = await fetch(apiBaseUri + '/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
  return response.json()
}

export default {
  getUsers,
  getChatHistory,
  sendMessage
}