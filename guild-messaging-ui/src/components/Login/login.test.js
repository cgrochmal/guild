import React from 'react'
import renderer from 'react-test-renderer'
import {Login} from './login.js'
import TestHelper from '../../test/testHelper'

it('matches the Login snapshot', () => {
  localStorage.currentUserId = "1"
  const mockUsers = TestHelper.getMockUsers(5, Date.now())
  const tree = renderer
    .create(<Login users={mockUsers}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})