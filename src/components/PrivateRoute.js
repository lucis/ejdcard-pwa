import React from 'react'
import {
  Route,
  Redirect,
} from "react-router-dom";
import { withUser } from '../contexts/AuthContext'

const PrivateRoute = ({ component: Component, user, role, ...rest }) => {
  // verify that the current user has role and whatnot
  return (
  <Route
    {...rest}
    render={props =>
      !!user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)}

export default withUser(PrivateRoute)