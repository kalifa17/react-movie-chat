import { combineReducers } from "redux";
import movies from "./movieReducer";
import moviesComments from "./movieCommentsReducer";

export default combineReducers({
  movies,
  moviesComments
});
