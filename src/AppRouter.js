import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Landing, Login, AppShell } from './pages'
import PrivateRoute from './components/PrivateRoute'
import firebase from 'firebase/app'
import 'firebase/auth'

class AppRouter extends Component {
  state = {
    user: null
  }
  
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  render = () => {
    const { user } = this.state
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/login/" component={Login} />
          <PrivateRoute user={user} path="/app/" component={AppShell} />
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter
