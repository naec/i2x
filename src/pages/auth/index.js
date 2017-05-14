import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { Redirect } from 'react-router-dom';
import authApi from 'api/auth';
import store from 'store/auth-store';
import { setUserToken } from 'store/actions';
import Toast from 'packages/mui-snackbar-pipe';
class Auth extends React.Component {

  constructor() {
    super();
    this.onLoginChanged = this.onLoginChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    let state = store.getState();

    this.state = {
      login: 'challenge@i2x.ai',
      password: 'pass123',
      loggedIn: !!state.authToken,
      isSubmitDisabled: false,
    }
  }

  onLoginChanged(event) {
    this.setState({
      login: event.target.value
    });
  }

  onPasswordChanged(event) {
    this.setState({
      password: event.target.value
    });
  }

  submit() {
    this.setState({
      isSubmitDisabled: true,
    }, () => {
      let authAction = authApi.login({
        email: this.state.login,
        password: this.state.password
      });

      authAction.then(response => {

        console.log(1);
        if (response && response.token) {
          Toast.success('You are logged in');
          localStorage.setItem('authToken', response.token);
          store.dispatch(setUserToken(response.token));

          this.setState({
            loggedIn: true,
            isSubmitDisabled: false,
          });
        }
      }).catch((error) => {
        console.log(2, '~~');

        this.setState({
          isSubmitDisabled: false,
        }, () => {
            console.log('kek')
          Toast.success('You are NOT logged in');
          return Promise.resolve();
        })
      });
    });
  }

  render() {
    return (
      <div className="paper-offset flex-center">
        {this.state.loggedIn ? <Redirect to="/" /> : null }
        <div>
          <TextField
            onChange={this.onLoginChanged}
            value={this.state.login}
            floatingLabelText="Login" />
          <br/>
          <TextField
            onChange={this.onPasswordChanged}
            value={this.state.password}
            floatingLabelText="Password"
            type="password" />
          <br />
          <RaisedButton
            disabled={this.state.isSubmitDisabled}
            onClick={this.submit}
            fullWidth={true}
            primary={true}
            label="Log in" />
        </div>
      </div>
    )
  }
}

export default Auth;
