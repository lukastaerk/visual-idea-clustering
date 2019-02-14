import React, { Component } from "react";
import { connect } from "react-redux";
import { moveIdea } from "../actions";
import { isEqual } from "lodash";

class DropZone extends Component {
  handleDrop = event => {
    event.preventDefault();
    this.allowDropColor(null);
    const { sink, dispatch } = this.props;
    const unparsed = event.dataTransfer.getData("json");
    if (typeof unparsed !== "string" || unparsed.length === 0) return null;
    const data = JSON.parse(unparsed);
    const { id, type, container } = data;
    if (type !== "idea" || isEqual(container, sink)) return null;
    else return dispatch(moveIdea(container, sink, id));
  };
  allowDropColor = color => {
    this.dropZone.firstElementChild.style.background = color;
  };
  render() {
    const { children, dropColor } = this.props;
    return (
      <div
        ref={node => (this.dropZone = node)}
        onDrop={this.handleDrop}
        onDragOver={ev => {
          ev.preventDefault();
          this.allowDropColor(dropColor);
        }}
        onDragLeave={() => this.allowDropColor(null)}
      >
        {children}
      </div>
    );
  }
}

export default connect()(DropZone);
