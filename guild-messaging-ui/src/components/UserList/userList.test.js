import React from 'react'
import renderer from 'react-test-renderer'
import UserList from './userList.js'
import TestHelper from '../../test/testHelper'

it('matches the UserList snapshot', () => {
  localStorage.currentUserId = "1"
  const mockUsers = TestHelper.getMockUsers(5, Date.now())
  const tree = renderer
    .create(<UserList users={mockUsers}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})