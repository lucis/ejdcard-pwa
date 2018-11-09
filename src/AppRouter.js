import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Landing, Login, AppShell } from './pages'
import PrivateRoute from './components/PrivateRoute'
import firebase from 'firebase/app'
import 'firebase/auth'

class AppRouter extends Component {
  state = {
    user: null,
    loading: true
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user, loading: false })
    })
  }

  render = () => {
    const { user, loading } = this.state
    return (
      <BrowserRouter>
        <div>
          {loading && (
            <div className="fixed z-9999 top-0 left-0 bottom-0 right-0 bg-black-20 justify-center ">
              <CircularProgress style={{top: '50%', left: '50%', position: 'absolute'}} />
            </div>
          )}
          <Route path="/" exact component={Landing} />
          <Route path="/login/" component={Login} />
          <PrivateRoute user={user} path="/app/" component={AppShell} />
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter
