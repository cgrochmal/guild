// TODO: split into separate services (userService, messageService) as app grows

/**
 *  This is hard-coded for this assignment, but in a real-world scenario would use
 *  an environment variable set by the build (or overwritten by the developer)
*/ 
const apiBaseUri = 'http://localhost:3000'

async function getUsers() {
  const response = await fetch(apiBaseUri + '/users')
  return response.json()
}

// note: swapping from and to user id will return the same results 
async function getChatHistory(fromUserId, toUserId) {
  const response = await fetch(`${apiBaseUri}/messages?from_user=${fromUserId}&to_user=${toUserId}`)
  return response.json()
}

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