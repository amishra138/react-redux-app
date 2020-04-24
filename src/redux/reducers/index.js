import { combineReducers } from "redux";
import courses from "./courseReducer";

const rootReducer = combineReducers({
  courses: courses, // you can write only 'courses'
});

export default rootReducer;
