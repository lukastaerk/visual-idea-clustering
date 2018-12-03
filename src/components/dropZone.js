import React, { Component } from "react";
import { connect } from "react-redux";
import { moveIdea } from "../actions";

class DropZone extends Component {
  handleDrop = event => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text"));
    const { id, type, container } = data;
    if (type !== "idea") return null;

    const { sink, dispatch } = this.props;
    dispatch(moveIdea(container, sink, id));
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
