import * as actions from "../actions";

const initialState = {
  isLoggedIn: false,
};

function isLoggedInReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_IS_LOGGED_IN:
      return {
        ...state,
      };
    case actions.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
}

export const getIsLoggedIn = (state) => state.isLoggedIn;

export default isLoggedInReducer;
