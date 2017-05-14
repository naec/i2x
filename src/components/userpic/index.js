import React from 'react';
import { IconMenu, MenuItem, Avatar, IconButton, FontIcon } from 'material-ui';
// import PersonIcon from 'material-ui/svg-icons/social/person';
import { Redirect } from 'react-router-dom';

import store from 'store/auth-store';
import { clearUserToken } from 'store/actions';

class Userpic extends React.Component {
  static muiName = 'FlatButton';

  constructor(...props) {
    super(...props);
    this.signOut = this.signOut.bind(this);

    this.state = {
      isLoggedIn: !!store.getState().authToken
    };

    store.subscribe(() => {
      let isLoggedIn = this.state.isLoggedIn;
      let hasToken = !!store.getState().authToken;

      if(isLoggedIn !== hasToken) {
        this.setState({
          isLoggedIn: hasToken
        });
      }
    })
  }

  signOut() {
    localStorage.setItem('authToken', '');
    store.dispatch(clearUserToken());
  }

  render() {
    let isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        {isLoggedIn ?
          <IconMenu
            iconButtonElement={<Avatar className="clickable" icon={<FontIcon className="material-icons">person</FontIcon>} />}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>

            <MenuItem onClick={this.signOut} primaryText="Sign out" />
          </IconMenu>
          : <Redirect to="/auth" />
        }
      </div>
    );
  }
}

export default Userpic;
