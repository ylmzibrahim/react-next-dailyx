import { createSelector } from "reselect";
import { fromThemeReducer } from "../reducers";

export const getTheme = createSelector(
    fromThemeReducer.getTheme,
  (state) => state.theme
);
