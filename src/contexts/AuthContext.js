import React, { Component } from 'react'

const AuthContext = React.createContext({
  user: null
})

export const AuthConsumer = AuthContext.Consumer

export class AuthProvider extends Component {
  setUser = (user) => {
    this.setState({
      user
    })
  }

  state = {
    user: null,
    setUser: this.setUser
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const withUser = WrappedComponent => {
    const WithLoading = props => {
      return (
        <AuthConsumer>
          {({ user, setUser }) => (
            <WrappedComponent
              user={user}
              setUser={setUser}
              {...props}
            />
          )}
        </AuthConsumer>
      )
    }
    return WithLoading
  }
  
