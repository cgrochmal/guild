import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import UserList from '../UserList/userList'
import './login.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)
    Login.propTypes = {
      users: PropTypes.arrayOf(PropTypes.object)
    }
    this.state = {
      selectedUser: null
    }

    // I prefer to use explicit binding to auto-bound arrow functions in my react components.
    // I'm happy to elaborate on reasons why in the follow-up interview
    this.handleUserSelected = this.handleUserSelected.bind(this)
    this.logIn = this.logIn.bind(this)
  }

  /**
   * EVENT HANDLERS
   */
  handleUserSelected(user) {
    this.setState({selectedUser: user})
  }
  logIn() {
    const {selectedUser} = this.state
    localStorage.currentUserId = selectedUser.id
    this.props.history.push('/select-chat')
  }

  /**
   * RENDER FUNCTIONS
   */
  render() {
    const {users} = this.props
    const {selectedUser} = this.state

    return (
      <section className='login-container'>
        <h1 className='login-container__heading'>Please select your username</h1>
        <UserList users={users} handleUserSelected={this.handleUserSelected}/>
        <button className='chat-button login-container__button' onClick={this.logIn} disabled={!selectedUser}>
          {'Log In'}
        </button>
      </section>
    )
  }
}

export default withRouter(Login)