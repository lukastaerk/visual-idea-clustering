import React, { Component } from "react";
import Draggable from "./draggable";
import { renderIdeas } from "./idea";
import { colors } from "./../constants/index.json";

export const renderClusters = clusters => {
  const clustersRender = clusters.map((cluster, i) => {
    return (
      <Cluster
        position={cluster.position}
        key={cluster.id}
        id={cluster.id}
        width={cluster.width}
        height={cluster.height}
        ideas={cluster.ideas}
      />
    );
  });
  return clustersRender;
};

var styles = {
  clusterBox: {
    position: "absolute",
    borderRadius: 10,
    border: "2px solid " + colors.idea.border,
    background: colors.cluster.background,
    touchAction: "none",
    cursor: "move",
    zIndex: 1,
    margin: "0 auto"
  },
  h6: {
    textAlign: "center"
  }
};

export class Cluster extends Component {
  constructor(props) {
    super(props);
  }

  allowDrop = ev => {
    ev.preventDefault();
  };

  drop = ev => {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    console.log(data.id, data.type);
  };

  render() {
    const { id, position, ideas } = this.props;
    var pos = position ? position : {};
    var style = {
      ...styles.clusterBox,
      ...pos,
      ...{ width: 140 * ideas.length, height: 160 }
    };
    var displayIdeas = ideas ? renderIdeas(ideas, "cluster") : null;

    return (
      <Draggable id={id} type={"clusters"} style={style}>
        <div id={"cluster" + id} onDragOver={this.allowDrop} onDrop={this.drop}>
          <h6 style={styles.h6}>{"Cluster " + id}</h6>
          {displayIdeas}
        </div>
      </Draggable>
    );
  }
}
