//import { combineReducers } from "redux";
import clusteringReducer from "./clusteringReducer";
import undoable, { distinctState } from "redux-undo";

const undoableReducer = undoable(clusteringReducer, {
  filter: distinctState()
});

export default undoableReducer;
