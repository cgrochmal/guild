import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './components/Login/login'
import ChatSelector from './components/ChatSelector/chatSelector'
import ChatWindow from './components/ChatWindow/chatWindow'
import ApiService from './services/ApiService'


import ActionCableConnector from './services/ActionCable/ActionCableConnector'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.fetchUsers()
    ActionCableConnector.initialize()
  }

  async fetchUsers() {
    const users = await ApiService.getUsers()
    this.setState({users})
  }

  render() {
    const {users} = this.state
    return (
      <Router>
        <div>
          {/* TODO: dynamic routing */}
          <Switch>
            <Route path="/select-chat">
              <ChatSelector users={users}/>
            </Route>
            <Route path="/chats/:chat_user_id">
              <ChatWindow users={users}/>
            </Route>
            <Route path="/">
              <Login users={users}/>
            </Route>
            <Route path="/users">
              {/* <Users /> */}
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}