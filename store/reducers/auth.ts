const authReducers = (state = null, action) => {
    switch (action.type) {
      case "SET_AUTH_USER":
        // console.log(action)
        return action.payload;
      case "REMOVE_AUTH_USER":
          return null
      default:
        return state;
    }
  };
  
  export default authReducers;