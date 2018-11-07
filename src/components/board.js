import React, { Component } from "react";
import { renderIdeas } from "./idea";
import { renderClusters, Cluster } from "./cluster";
import { colors } from "./../constants/index.json";

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

  drop = ev => {
    const pos = this.boardRef.current.getBoundingClientRect();
    console.log(ev.target);
    this.props.handleDrop(ev, pos);
  };

  handleDrawCluster = ev => {
    if (!this.props.isDrawingCluster) return false;
    console.log(ev.type);
    if (ev.type == "mousedown") {
      this.setState({
        cluster: {
          x: ev.clientX,
          y: ev.clientY
        }
      });
    } else if (ev.type == "mouseup") {
      const { x, y } = this.state.cluster;
      console.log(x, y);
      let width = ev.clientX - x,
        height = ev.clientY - y;
      if (width > 120 && height > 100) {
        const { left, top } = this.boardRef.current.getBoundingClientRect();
        this.props.createCluster(x - left, y - top, width, height);
      }
    } else {
      //do nothing yet
    }
  };

  render() {
    const { dropedIdeas, clusters } = this.props;
    const clustersDisplay = clusters ? renderClusters(clusters, true) : null;
    const ideasDisplay = dropedIdeas ? renderIdeas(dropedIdeas, true) : null;
    return (
      <div style={styles.container}>
        <div style={styles.board}>
          <div
            id="board"
            ref={this.boardRef}
            style={styles.board}
            onDrop={this.drop}
            onDragOver={this.allowDrop}
            onMouseDown={this.handleDrawCluster}
            onMouseUp={this.handleDrawCluster}
          >
            {ideasDisplay}
            {clustersDisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
