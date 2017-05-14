import React from 'react';
import store from 'store/auth-store';
import recordingsApi from 'api/recordings';
import { Paper, Divider } from 'material-ui';
import Record from 'components/record';

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      results: [],
    }
  }

  componentWillMount() {
    let isLoggedIn = !!store.getState().authToken;

    if (isLoggedIn) {
      recordingsApi.getList().then(response => {
        this.setState({
          results: response.results
        });
      })
    }
  }

  render() {
    return (
      <Paper className="paper-offset" zDepth={2}>
        <span>Dashboard</span>
        <div>
          {this.state.results.map((item, index) => (
            <div key={'record-'+index}>
              {index !== 0 ? <Divider /> : null}
              <Record value={item} />
            </div>
          ))}
        </div>
      </Paper>
    )
  }
}

export default Dashboard;
