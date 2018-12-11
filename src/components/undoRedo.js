import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";
//import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <Button variant="outlined" onClick={onUndo} disabled={!canUndo}>
      Undo
    </Button>
    <Button variant="outlined" onClick={onRedo} disabled={!canRedo}>
      Redo
    </Button>
  </p>
);

const mapStateToProps = state => {
  return {
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  };
};

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);

export default UndoRedo;
