export const GET_USER = "[user] Get User";
export const SET_USER = "[user] Set User";

export const getUser = () => ({
  type: GET_USER,
});

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});
