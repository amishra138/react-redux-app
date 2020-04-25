import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiCallStatusReducer";

const rootReducer = combineReducers({
  courses: courses, // you can write only 'courses'
  authors: authors,
  apiCallsInProgress: apiCallsInProgress,
});

export default rootReducer;
