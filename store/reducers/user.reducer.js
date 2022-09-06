import * as actions from "../actions";

const initialState = {
  user: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER:
      return {
        ...state,
      };
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export const getUser = (state) => state.user;

export default userReducer;
