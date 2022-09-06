import { combineReducers } from "redux";
import userReducer, * as fromUserReducer from "./user.reducer";
import isLoggedInReducer, * as fromIsLoggedInReducer from "./isLoggedIn.reducer";
import languageReducer, * as fromLanguageReducer from "./language.reducer";
import themeReducer, * as fromThemeReducer from "./theme.reducer";

const reducers = combineReducers({
  user: userReducer,
  isLoggedIn: isLoggedInReducer,
  language: languageReducer,
  theme: themeReducer,
});

export { reducers, fromUserReducer, fromIsLoggedInReducer, fromLanguageReducer, fromThemeReducer };
