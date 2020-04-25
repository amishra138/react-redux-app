import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

//in production we don't need other files
export default function configureStore(initialState) {
  //you can apply any middleware, for now we have added immutable middleware to prevent state modify anywhere
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
