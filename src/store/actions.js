
export const setUserToken = (token) => {
  return {
    type: 'SET_TOKEN',
    token
  }
};

export const clearUserToken = () => {
  return {
    type: 'SET_TOKEN',
    token: undefined
  }
}
