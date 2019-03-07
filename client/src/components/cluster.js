import React from "react";
import Draggable from "./draggable";
import RenameableH6 from "./renameableH6";
import { ideaSize } from "./../constants/index.json";
import { renderIdeas } from "./";
import { clusterColor } from "./../constants/color";

export const renderClusters = clusters => {
  if (!clusters) return null;
  const clustersRender = clusters.map((cluster, i) => {
    return <Cluster key={cluster.id} {...cluster} />;
  });
  return clustersRender;
};
export const getShape = length => {
  let sqrtUp = Math.round(Math.sqrt(length) + 0.49);
  let diff = parseInt((sqrtUp ** 2 - length) / sqrtUp);
  return [sqrtUp, sqrtUp - diff];
};

var styles = {
  clusterBox: {
    position: "absolute",
    borderRadius: 10,
    padding: "2px 2px",
    background: clusterColor,
    touchAction: "none",
    cursor: "move",
    zIndex: 1,
    overflow: "hidden"
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
    ...{
      width: 4 + ideaSize.width * width,
      height: ideaSize.height * height + 50
    }
  };
  const dropZone = "CLUSTER" + id;
  const container = { type: "CLUSTER", id: id };
  var displayIdeas = renderIdeas(ideas, container, dropZone);
  return (
    <Draggable id={id} dropZone={dropZone} type={"cluster"} style={style}>
      <div id={id}>
        <RenameableH6
          container={container}
          style={styles.h6}
          name={name}
          defaultName={"CLUSTER"}
        />
        {displayIdeas}
      </div>
    </Draggable>
  );
};

export default Cluster;
