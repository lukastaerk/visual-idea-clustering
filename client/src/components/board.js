import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinkFromTarget } from "../utils";
import { renderIdeas, renderClusters } from "./";
import { moveIdea, moveCluster } from "../actions";
import { boardColor } from "./../constants/color";

var styles = {
  board: {
    width: 2000,
    height: 2000,
    background: boardColor,
    position: "relative",
    zIndex: 0
  },
  container: {
    overflow: "auto",
    height: "calc(100vh - 80px)"
  }
};

const mapDispatchToProps = dispatch => ({
  moveIdea: (...props) => dispatch(moveIdea(...props)),
  moveCluster: (...props) => dispatch(moveCluster(...props))
});

class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  allowDrop = ev => {
    ev.preventDefault();
  };

  handleDrop = event => {
    event.preventDefault();
    const { top, left } = this.boardRef.current.getBoundingClientRect();
    const unparsed = event.dataTransfer.getData("json");
    if (typeof unparsed !== "string" || unparsed.length === 0) return null;
    const data = JSON.parse(unparsed);
    const {
      id,
      type,
      container,
      offset: { x, y }
    } = data;
    let position = {
      left: event.clientX - x - left,
      top: event.clientY - y - top
    };
    if (type === "idea") {
      let sink = getSinkFromTarget(event.target);

      if (sink.type === "IDEA" && sink.id === id) {
        sink = { type: "BOARD" };
      }
      this.props.moveIdea(container, sink, id, position);
    } else if (type === "cluster") {
      this.props.moveCluster(id, position);
    }
  };

  render() {
    const { boardIdeas, clusters } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.board}>
          <div
            id="board"
            className="BOARD"
            ref={this.boardRef}
            style={styles.board}
            onDrop={this.handleDrop}
            onDragOver={this.allowDrop}
          >
            {renderIdeas(boardIdeas, { type: "BOARD" })}
            {renderClusters(clusters)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Board);
