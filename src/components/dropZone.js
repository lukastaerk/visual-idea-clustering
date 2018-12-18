import React, { Component } from "react";
import { connect } from "react-redux";
import { moveIdea } from "../actions";
import { isEqual } from "lodash";

class DropZone extends Component {
  handleDrop = event => {
    event.preventDefault();
    const { sink, dispatch } = this.props;
    const unparsed = event.dataTransfer.getData("json");
    if (typeof unparsed !== "string" || unparsed.length === 0) return null;
    const data = JSON.parse(unparsed);
    const { id, type, container } = data;
    if (type !== "idea" || isEqual(container, sink)) return null;
    else return dispatch(moveIdea(container, sink, id));
  };
  render() {
    const { children } = this.props;
    return (
      <div onDrop={this.handleDrop} onDragOver={ev => ev.preventDefault()}>
        {children}
      </div>
    );
  }
}

export default connect()(DropZone);
