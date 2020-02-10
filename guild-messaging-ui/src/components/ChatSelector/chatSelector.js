import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import UserList from '../UserList/userList'
import './chatSelector.scss'

class ChatSelector extends React.Component {
  constructor(props) {
    super(props)
    ChatSelector.propTypes = {
      users: PropTypes.arrayOf(PropTypes.object)
    }
    this.state = {
      selectedChatUser: null,
      users: props.users.filter(user => user.id !== +localStorage.currentUserId)
    }

    this.goBack = this.goBack.bind(this)
    this.startChat = this.startChat.bind(this)
    this.handleUserSelected = this.handleUserSelected.bind(this)
  }

  componentDidUpdate(prevProps) {
    const {users} = this.props
    if (this.props.users !== prevProps.users) {
      // this code is repeated and could be collapsed into a function
      const usersBesidesCurrent = users.filter(user => user.id !== +localStorage.currentUserId)
      this.setState({users: usersBesidesCurrent})
    }
  }

  /**
   * EVENT HANDLERS
   */
  goBack() {
    this.props.history.goBack()
  }
  startChat() {
    const {selectedChatUser} = this.state
    this.props.history.push('/chats/'+selectedChatUser.id)
  }
  handleUserSelected(user) {
    this.setState({selectedChatUser: user})
  }

  /**
   * RENDER FUNCTIONS
   */
  render() {
    const {users, selectedChatUser} = this.state
    return (
      <section className='chat-select-container'>
        <h1 className='chat-select-container__heading'>Select a user to chat with</h1>
        <UserList users={users} handleUserSelected={this.handleUserSelected}/>
        <span className='chat-select-container__buttons'>
          <button className='chat-button' onClick={this.goBack}>
            {'Go Back'}
          </button>
          <button className='chat-button' onClick={this.startChat} disabled={!selectedChatUser}>
            {'Open Chat'}
          </button>
        </span>
      </section>
    )
  }
}

export default withRouter(ChatSelector)