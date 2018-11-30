import React from "react";
import Draggable from "./draggable";
import RenameableH6 from "./renameableH6";
import { renderIdeas } from "./";
import { colors } from "./../constants/index.json";

export const renderClusters = clusters => {
  if (!clusters) return null;
  const clustersRender = clusters.map((cluster, i) => {
    return <Cluster key={cluster.id} {...cluster} />;
  });
  return clustersRender;
};
const getShape = length => {
  let sqrtUp = Math.round(Math.sqrt(length) + 0.49);
  let diff = parseInt((sqrtUp ** 2 - length) / sqrtUp);
  return [sqrtUp, sqrtUp - diff];
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
    textAlign: "center",
    minHeight: "1em"
  }
};

const Cluster = ({ id, position, ideas, name }) => {
  const [width, height] = getShape(ideas.length);
  var style = {
    ...styles.clusterBox,
    ...position,
    ...{ width: 4 + 120 * width, height: 120 * height + 50 }
  };
  const dropZone = "CLUSTER" + id;
  const container = { type: "CLUSTER", id: id };
  var displayIdeas = renderIdeas(ideas, container, dropZone);
  return (
    <Draggable id={id} dropZone={dropZone} type={"cluster"} style={style}>
      <div id={id} className={dropZone}>
        <RenameableH6
          container={container}
          className={dropZone}
          style={styles.h6}
          name={name || "Cluster"}
        />
        {displayIdeas}
      </div>
    </Draggable>
  );
};

export default Cluster;
