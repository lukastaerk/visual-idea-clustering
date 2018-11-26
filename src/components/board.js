import React, { Component } from "react";
import { connect } from "react-redux";
import { renderIdeas } from "./idea";
import { renderClusters, Cluster } from "./cluster";
import { colors } from "./../constants/index.json";
import { moveIdea } from "../actions/moveIdea";
import { moveCluster } from "../actions/moveCluster";

var styles = {
  board: {
    width: "150%",
    height: "150vh",
    background: colors.board.background,
    position: "relative",
    zIndex: 0
  },
  container: { overflow: "auto", height: "100vh" }
};

const mapDispatchToProps = dispatch => ({
  moveIdea: (...props) => dispatch(moveIdea(...props)),
  moveCluster: (...props) => dispatch(moveCluster(...props))
});

const mapStateToProps = state => ({
  ...state
});

const getSinkFormTarget = target => {
  if (target.classList[0].slice(0, 7) === "CLUSTER") {
    return {
      type: target.classList[0].slice(0, 7),
      id: parseInt(target.classList[0].slice(7))
    };
  } else if (target.classList[0].slice(0, 4) === "IDEA") {
    return {
      type: target.classList[0].slice(0, 4),
      id: parseInt(target.classList[0].slice(4))
    };
  }
  return { type: target.classList[0] };
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  dataLoader = (fromIndex, toIndex, JSON_DATA) => {
    const data = JSON_DATA.slice(fromIndex, toIndex);
    var ideas = data.map(idea => {
      idea.position = { x: 0, y: 0 };
      return idea;
    });
    return ideas;
  };

  allowDrop = ev => {
    ev.preventDefault();
  };

  drop = event => {
    event.preventDefault();
    const { top, left } = this.boardRef.current.getBoundingClientRect();
    var data = JSON.parse(event.dataTransfer.getData("text"));
    const {
      id,
      type,
      container,
      offset: { x: x, y: y }
    } = data;
    let position = {
      left: event.clientX - x - left,
      top: event.clientY - y - top
    };
    console.log("drop ", type);
    if (type === "idea") {
      let sink = getSinkFormTarget(event.target);
      console.log(sink, position);
      if (sink.type === "IDEA" && sink.id === id) sink = { type: "BOARD" };
      if (container.type === "CLUSTER" && container === sink) return null;
      this.props.moveIdea(container, sink, id, position);
    } else if (type === "cluster") {
      this.props.moveCluster(id, position);
    }
  };

  render() {
    const { boardIdeas, clusters } = this.props;
    const clustersDisplay = clusters ? renderClusters(clusters) : null;
    const ideasDisplay = boardIdeas
      ? renderIdeas(boardIdeas, { type: "BOARD" })
      : null;
    return (
      <div style={styles.container}>
        <div style={styles.board}>
          <div
            id="board"
            className="BOARD"
            ref={this.boardRef}
            style={styles.board}
            onDrop={this.drop}
            onDragOver={this.allowDrop}
          >
            {ideasDisplay}
            {clustersDisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
