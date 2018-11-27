import React, { Component } from "react";
import Draggable from "./draggable";
import { renderIdeas } from "./idea";
import { colors } from "./../constants/index.json";

export const renderClusters = clusters => {
  if (!clusters) return null;
  const clustersRender = clusters.map((cluster, i) => {
    return <Cluster id={cluster.id} {...cluster} />;
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

  render() {
    const { id, position, ideas } = this.props;
    const sqrtUp = Math.round(Math.sqrt(ideas.length) + 0.49);
    const diff = parseInt((sqrtUp ** 2 - ideas.length) / sqrtUp);
    var pos = position ? position : {};
    var style = {
      ...styles.clusterBox,
      ...pos,
      ...{ width: 3 + 120 * sqrtUp, height: 120 * (sqrtUp - diff) + 50 }
    };
    const dropZone = "CLUSTER" + id;
    var displayIdeas = renderIdeas(
      ideas,
      { type: "CLUSTER", id: id },
      dropZone
    );

    return (
      <Draggable id={id} dropZone={dropZone} type={"cluster"} style={style}>
        <div id={id} className={dropZone}>
          <h6 className={dropZone} style={styles.h6}>
            {"Cluster " + id}
          </h6>
          {displayIdeas}
        </div>
      </Draggable>
    );
  }
}
