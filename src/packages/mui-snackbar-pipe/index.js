import React from 'react';
import {Snackbar} from 'material-ui';

const toastList = [];

const toastStyles = {
  simple: {
    background: '#333333'
  },
  success: {
    background: '#38B800'
  },
  danger: {
    background: '#DD2C00'
  }
};

export default class Toast extends React.Component {

  static simple(message) {
    toastList.push({
      message,
      type: 'simple'
    });
  };

  static success(message) {
    toastList.push({
      message,
      type: 'success'
    })
  };

  static danger(message) {
    console.log('message',message);
    toastList.push({
      message,
      type: 'danger'
    })
  };

  constructor() {
    super();
    this.state = {
      isVisible: false,
      toast: {
        message: '',
        type: ''
      }
    };
  }

  componentShouldUpdate() {
    console.log('!!!');
  }

  showNext() {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true,
        toast: {...toastList[0]}
      });
    }
  }

  handlers = {
    handleRequestClose: () => {
      this.setState({
        isVisible: false,
        toast: {
          message: '',
          type: ''
        }
      }, () => {
        setTimeout(() => {
          toastList.shift();
        }, 100);
      });
    }
  };

  render() {
    console.log('toastList',toastList);

    if (toastList.length) {
      this.showNext();
    }

    return <Snackbar
      bodyStyle={toastStyles[this.state.toast.type]}
      open={this.state.isVisible}
      message={this.state.toast.message}
      autoHideDuration={4000}
      onRequestClose={this.handlers.handleRequestClose}
    />;
  }
};
