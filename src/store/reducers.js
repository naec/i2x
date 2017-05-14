const initialState = {
  authToken: undefined
};

const appReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case 'SET_TOKEN':
      newState.authToken = action.token;
      break;
    default: break;
  }

  return newState;
};

export default appReducer;
