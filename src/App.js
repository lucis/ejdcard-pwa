import React, { Component } from 'react';
import logo from './logo.svg';
import withRoot from './withRoot'
import './global.css';

import AppRouter from './AppRouter'

class App extends Component {
  render() {
    return (
      <AppRouter/>
    );
  }
}

export default withRoot(App);
