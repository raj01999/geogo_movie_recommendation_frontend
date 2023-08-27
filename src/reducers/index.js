import filter from "./filter";
import movies from "./movies";
import user from "./user";

import { combineReducers } from "redux";

/**
 * Combined all the reducers to one reducer
 */
const rootReducer = combineReducers({
  filter,
  movies,
  user,
});

export default rootReducer;
