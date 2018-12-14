import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";
import { Button } from "../styledComponents";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo, classes }) => (
  <p>
    <Button onClick={onUndo} disabled={!canUndo} fullWidth={false}>
      Undo
    </Button>
    <Button onClick={onRedo} disabled={!canRedo} fullWidth={false}>
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
