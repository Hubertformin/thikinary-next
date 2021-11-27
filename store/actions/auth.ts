export const setAuthUser = payload => {
  return {
    type: 'SET_AUTH_USER', // mandatory key
    payload
  }
};
  
  export const removeAuthUser = payload => ({
    type: 'REMOVE_AUTH_USER', // mandatory key
    payload
  });