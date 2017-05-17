import store from 'store/auth-store';

const defaultHeaders = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
};

const api = (requestString, params = {}) => {
  let [method, url] = requestString.split(' ');
  let resultingPromise = undefined;

  if (method === 'GET') {
    let authToken = store.getState().authToken;

    const headers = {
      ...defaultHeaders
    };

    if (authToken) {
      headers.Authorization = `JWT ${authToken}`;
    }

    resultingPromise = fetch(url, {
      method: 'GET',
      headers: headers,
    });
  } else {
    resultingPromise = fetch(url, {
      method,
      headers: defaultHeaders,
      body: JSON.stringify(params)
    });
  }

  return resultingPromise.then(res=>{
    if (res.status !== 200){
      return Promise.reject();
    } else {
      return  res.json();
    }

  });
}

export default api;
