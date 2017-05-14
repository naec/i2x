import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar } from 'material-ui';
import { Route } from 'react-router-dom'
import Userpic from 'components/userpic';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Toast from 'packages/mui-snackbar-pipe';

import './App.css';

class App extends Component {
  render() {



    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="i2x challenge"
            showMenuIconButton={false}
            iconElementRight={<Userpic />}
          />
          <div>
            <Route path={`${this.props.match.path}`} exact component={Dashboard} />
            <Route path={`${this.props.match.path}auth`} component={Auth} />
          </div>
          <Toast />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
