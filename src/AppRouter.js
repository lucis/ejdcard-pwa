import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import { Landing, Login, Admin } from './pages'
import PrivateRoute from './components/PrivateRoute'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/login/" component={Login} />
      <PrivateRoute path="/admin/" component={Admin} />
    </div>
  </BrowserRouter>
)

export default AppRouter