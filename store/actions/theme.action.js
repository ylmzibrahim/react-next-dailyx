export const GET_THEME = "[user] Get Theme";
export const SET_THEME = "[user] Set Theme";

export const getTheme = () => ({
  type: GET_THEME,
});

export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
});
