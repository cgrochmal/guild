import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import ActionCableConnector from '../../services/ActionCable/ActionCableConnector'
import ApiService from '../../services/ApiService'
import './chatWindow.scss'

/**
 *  Container for a chat conversation between 2 users. 
 *  Registers with ActionCable on didMount
 */
export class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
    ChatWindow.propTypes = {
      users: PropTypes.arrayOf(PropTypes.object)
    }
    this.state = {
      loading: true,
      messages: [],
      messageText: ''
    }
    // add to 'this' to prevent repeat work
    this.chatUserId = +this.props.match.params.chat_user_id

    this.goBack = this.goBack.bind(this)
    this.setMessageText = this.setMessageText.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleIncomingMessage = this.handleIncomingMessage.bind(this)
  }

  componentDidMount() {
    this.fetchChatHistory()
    ActionCableConnector.subscribe(this.handleIncomingMessage)
  }

  async fetchChatHistory() {
    const currentUserId = +localStorage.currentUserId
    const messages = await ApiService.getChatHistory(currentUserId, this.chatUserId)
    this.setState({messages, loading: false})
  }

  /**
   * EVENT HANDLERS
   */
  handleIncomingMessage(data) {
    const {messages} = this.state
    // TODO: handle edge cases, don't just assume data is correct
    const {id, from_user_id, to_user_id, created_at, body} = data
    
    if (from_user_id === this.chatUserId && to_user_id === +localStorage.currentUserId) {
      const newMessage = {
        id, 
        from_user_id,
        to_user_id,
        created_at,
        body
      }
      messages.push(newMessage)
      this.setState({messages})
    }
  }

  goBack() {
    this.props.history.goBack()
  }

  setMessageText(e) {
    const newText = e.target.value
    this.setState({messageText: newText})
  }

  async sendMessage() {
    const {messageText, messages} = this.state
    const message = {
      body: messageText,
      created_at: Date.now(), // TODO: date formatting
      to_user: this.chatUserId,
      from_user: +localStorage.currentUserId
    }
    // immediately render placeholder so we don't have to wait on the API
    messages.push(message)
    const newMessageIndex = messages.indexOf(message)
    this.setState({messages, messageText: ''})
    
    // TODO: UI rollback logic in case of failure
    const createdMessage = await ApiService.sendMessage(message)
    // overwrite temporary message with actual result from API
    messages[newMessageIndex] = createdMessage
    this.setState({messages})
  }

  /**
   * RENDER FUNCTIONS
   */
  renderChatMessages() {
    const {loading, messages} = this.state
    if (loading) {
      return <span className='messages-empty'>{'Loading Message History...'}</span>
    }
    else if (!messages.length) {
      return <span className='messages-empty'>{'No conversation history. Type a message below to get things started.'}</span>
    }
    else {
      //TODO: componentize this
      const chatUser = this.props.users.find(user => user.id === this.chatUserId)
      return messages.map(message => {
        const senderName = message.from_user_id === this.chatUserId ? chatUser.username : 'you'
        // TODO: better date parsing
        return (
          <div className='message' key={'message-'+message.created_at}>
            <span className='message__from'>{`${senderName} at ${message.created_at}:`}</span>
            <span className='message__body'>{message.body}</span>
          </div> 
        )
      })
    }
  }

  render() {
    const {users} = this.props
    const {messageText} = this.state

    // TODO: improve this edge case handling
    if (!users || !users.length) return null

    const chatUser = users.find(user => user.id === this.chatUserId)

    return (
      <section className='chat-window'>
        <h1 className='chat-window__heading'>{'Conversation with '+chatUser.username}</h1>
        <div className='chat-window__messages'>
          {this.renderChatMessages()}
        </div>
        <input className='chat-window__input' onChange={this.setMessageText} value={messageText}/>
        <span className='chat-window__buttons'>
          <button className='chat-button' onClick={this.goBack}>
            {'Go Back'}
          </button>
          <button className='chat-button' onClick={this.sendMessage} disabled={!messageText}>
            {'Send Message'}
          </button>
        </span>
      </section>
    )
  }
}

export default withRouter(ChatWindow)