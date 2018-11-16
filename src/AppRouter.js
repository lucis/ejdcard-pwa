import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Landing, Login, AppShell } from './pages'
import { withLoading } from './contexts/LoadingContext'
import PrivateRoute from './components/PrivateRoute'

class AppRouter extends Component {
  render = () => {
    const { isLoading } = this.props
    return (
      <BrowserRouter>
        <div>
          {isLoading && (
            <div className="fixed z-9999 top-0 left-0 bottom-0 right-0 bg-black-20 justify-center ">
              <CircularProgress style={{top: '50%', left: '50%', position: 'absolute'}} />
            </div>
          )}
          <Route path="/" exact render={() => <Redirect to={{ pathname: `/login` }} />} />
          <Route path="/login/" component={Login} />
          <PrivateRoute path="/app/" component={AppShell} />
        </div>
      </BrowserRouter>
    )
  }
}

export default withLoading(AppRouter)
