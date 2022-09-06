export const GET_IS_LOGGED_IN = "[user] Get Is Logged In";
export const SET_IS_LOGGED_IN = "[user] Set Is Logged In";

export const getIsLoggedIn = () => ({
  type: GET_IS_LOGGED_IN,
});

export const setIsLoggedIn = (payload) => ({
  type: SET_IS_LOGGED_IN,
  payload,
});
