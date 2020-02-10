import React from 'react'
import PropTypes from 'prop-types'

import './userList.scss'

/**
 * Reusable user list component - encapsulates styles and selection state
 */
export default class UserList extends React.Component {
  constructor(props) {
    super(props)
    UserList.propTypes = {
      users: PropTypes.arrayOf(PropTypes.object),
      handleUserSelected: PropTypes.func 
    }
    this.state = {
      selectedUser: null
    }
  }
  /** 
  * EVENT HANDLERS
  */
  selectUser(user) {
    const {handleUserSelected} = this.props
    this.setState({selectedUser: user})
    if (handleUserSelected) {
      handleUserSelected(user)
    }
  }

  /**
   * RENDER FUNCTIONS
   */
  render() {
    const {users} = this.props
    const {selectedUser} = this.state
    if (users) {
      const userRows = users.map(user => {
        const isSelected = selectedUser && selectedUser.id === user.id
        return (
          <span 
            onClick={() => this.selectUser(user)} 
            className={'user-list__row' + (isSelected ? '--selected' : '')}
            key={'user-'+user.id}
          >
            {user.username}
          </span>
        )
      })
      return (
        <div className='user-list'>
          {userRows}
        </div>
      )
    }
    else return null
  }

}