export const GET_LANGUAGE = "[user] Get Language";
export const SET_LANGUAGE = "[user] Set Language";


export const getLanguage = () => ({
  type: GET_LANGUAGE,
});

export const setLanguage = (payload) => ({
  type: SET_LANGUAGE,
  payload,
});
