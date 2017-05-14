import api from './base';

const authApi = {
  login: (params = {}) => {
    if (!params.email) {
      throw new Error('authApi: "email" is requred to authentificate');
    }

    if (!params.password) {
      throw new Error('authApi: "password" is requred to authentificate');
    }

    return api('POST https://i2x-challenge.herokuapp.com/core/login/', params);
  }
}

export default authApi;
