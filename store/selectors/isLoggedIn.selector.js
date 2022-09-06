import { createSelector } from "reselect";
import { fromIsLoggedInReducer } from "../reducers";

export const getIsLoggedIn = createSelector(
  fromIsLoggedInReducer.getIsLoggedIn,
  (state) => state.isLoggedIn
);
