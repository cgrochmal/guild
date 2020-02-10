import React from 'react'
import renderer from 'react-test-renderer'
import {ChatWindow} from './chatWindow.js'
import TestHelper from '../../test/testHelper'

it('matches the ChatWindow snapshot', () => {
  localStorage.currentUserId = "1"
  const mockUsers = TestHelper.getMockUsers(5, Date.now())
  const match = {params: {chat_user_id: 2}}
  const tree = renderer
    .create(<ChatWindow users={mockUsers} match={match}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})