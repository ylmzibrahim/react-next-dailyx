import * as actions from "../actions";

const initialState = {
  theme: "light",
};

function themeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_THEME:
      return {
        ...state,
      };
    case actions.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}

export const getTheme = (state) => state.theme;

export default themeReducer;
