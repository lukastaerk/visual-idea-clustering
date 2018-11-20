import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import moveIdeaReducer from "./moveIdeaReducer";
import loadIdeaReducer from "./loadIdeaReducer";

export default combineReducers({
  simpleReducer,
  moveIdeaReducer,
  loadIdeaReducer
});
