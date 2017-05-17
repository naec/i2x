import React from 'react';
import {Snackbar} from 'material-ui';

const toastList = {
  items: []
};

const handler = {
  set: (target, key, value) => {
    target[key] = value;
    return true;
  },
};

let toastListProxy = new Proxy(toastList, handler);

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
    toastListProxy.items = [...toastListProxy.items, {
      message,
      type: 'simple'
    }];
  };

  static success(message) {
    toastListProxy.items = [...toastListProxy.items, {
      message,
      type: 'success'
    }];
  };

  static danger(message) {
    toastListProxy.items = [...toastListProxy.items, {
      message,
      type: 'danger'
    }];
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

    toastListProxy = new Proxy(toastList, {
      set: (target, key, value) => {
        target[key] = value;
        if(value.length){
          this.showNext();
        }
        return true;
      },
    });
  }

  showNext() {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true,
        toast: {...toastListProxy.items[0]}
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
          let pipe = [...toastListProxy.items];
          pipe.shift();
          toastListProxy.items = pipe;
        }, 100);
      });
    }
  };

  render() {
    return <Snackbar
      bodyStyle={toastStyles[this.state.toast.type]}
      open={this.state.isVisible}
      message={this.state.toast.message}
      autoHideDuration={4000}
      onRequestClose={this.handlers.handleRequestClose}
    />;
  }
};
