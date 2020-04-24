import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
  courses: courses, // you can write only 'courses'
  authors: authors,
});

export default rootReducer;
