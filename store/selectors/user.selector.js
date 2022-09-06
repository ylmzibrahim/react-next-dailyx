import { createSelector } from "reselect";
import { fromUserReducer } from "../reducers";

export const getUser = createSelector(
  fromUserReducer.getUser,
  (state) => state.user
);
