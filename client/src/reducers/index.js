import { combineReducers } from "redux";
import clusteringReducer from "./clusteringReducer";
import activeIdea from "./activeIdea";
import undoable from "redux-undo";

const undoableReducer = undoable(clusteringReducer, {
  limit: 50
});

const reducer = combineReducers({
  clustering: undoableReducer,
  activeIdea: activeIdea
});

export default reducer;
