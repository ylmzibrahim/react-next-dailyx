import * as actions from "../actions";

const initialState = {
  language: "en-US",
};

function languageReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_LANGUAGE:
      return {
        ...state,
      };
    case actions.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
}

export const getLanguage = (state) => state.language;

export default languageReducer;
