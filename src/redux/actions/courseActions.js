import * as types from "./actionTypes";

//This function is an "action"
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
