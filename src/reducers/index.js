import { combineReducers } from "redux";
import clusteringReducer from "./clusteringReducer";
import activeIdea from "./activeIdea";
import undoable, { distinctState } from "redux-undo";

const undoableReducer = undoable(clusteringReducer, {
  filter: distinctState(),
  limit: 50
});

const reducer = combineReducers({
  clustering: undoableReducer,
  activeIdea
});

export default reducer;
