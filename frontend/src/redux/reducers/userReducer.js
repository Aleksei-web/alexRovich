import * as TYPES from "../types/user";

function userReducer(state = null, action) {
  switch (action.type) {
    case TYPES.ADD_USER:
      return action.payload;
    case TYPES.DELETE_USER:
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;
