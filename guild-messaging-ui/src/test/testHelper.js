function getMockUser(id, username, created_at) {
  return {
    id, 
    username, 
    created_at
  }
}

function getMockUsers(count, created_at) {
  const userList = []
  for (let i = 0; i < count; i++) {
    userList.push(getMockUser(i+1, 'user'+i, created_at + 10))
  }
  return userList
}

export default {
  getMockUser,
  getMockUsers
}