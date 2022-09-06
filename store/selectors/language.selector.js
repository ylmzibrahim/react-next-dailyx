import { createSelector } from "reselect";
import { fromLanguageReducer } from "../reducers";

export const getLanguage = createSelector(
  fromLanguageReducer.getLanguage,
  (state) => state.language
);