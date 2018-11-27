import React, { Component } from "react";
import { renderIdeas } from "./idea";
import { colors } from "./../constants/index.json";

var styles = {
  ideaStack: {
    position: "relative",
    margin: "0 auto",
    marginTop: 20,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: colors.header.background,
    width: 150,
    height: 170,
    backgroundColor: colors.board.background
  },
  ideaContainer: {
    position: "relative",
    margin: "0 auto",
    width: 120,
    height: 120
  },
  h6: {
    color: colors.header.background,
    textAlign: "center"
  }
};

class IdeaStack extends Component {
  allowDrop = ev => {
    ev.preventDefault();
    console.log(ev.type);
    if (ev.type === "drop") this.props.handleDropTrash(ev);
    ev.target.style.backgroundColor =
      ev.type === "dragover"
        ? colors.stack.warning
        : styles.ideaStack.backgroundColor;
  };

  renderContainer = (isTrash, ideasDisplay = null) => {
    if (isTrash) {
      return (
        <div
          style={styles.ideaContainer}
          onDrop={this.allowDrop}
          onDragOver={this.allowDrop}
          onDragLeave={this.allowDrop}
        />
      );
    } else {
      return <div style={styles.ideaContainer}>{ideasDisplay}</div>;
    }
  };

  render() {
    const { nextIdeas, isTrash } = this.props;
    const ideasDisplay = renderIdeas(nextIdeas, { type: "STACK" }, "STACK");
    const ideaContainer = this.renderContainer(isTrash, ideasDisplay);
    return (
      <div style={styles.ideaStack}>
        <h6 style={styles.h6}>{isTrash ? "Idea Trash" : "Idea Stack"}</h6>
        {ideaContainer}
      </div>
    );
  }
}

export default IdeaStack;
