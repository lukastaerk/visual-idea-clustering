import React from "react";
import { colors } from "../constants/index.json";
import { DropZone } from "./";

var styles = {
  item: {
    border: "1px solid " + colors.idea.border,
    background: colors.cluster.background,
    margin: "0 auto"
  },
  box: {
    margin: "0 auto",
    marginTop: 20,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: colors.header.background,
    backgroundColor: colors.board.background,
    maxWidth: 150,
    overflow: "hidden"
  }
};

const Item = ({ id, name }) => {
  return (
    <DropZone sink={{ type: "CLUSTER", id: id }}>
      <div style={styles.item}>
        <a href={`/linking-to-a-specific-scroll-position-on-a-web-page#${id}`}>
          {name}
        </a>
      </div>
    </DropZone>
  );
};

const ClusterList = ({ clusters }) => {
  var clusterList = clusters.map(c => (
    <Item key={"list" + c.id} name={c.name || "unnamed"} id={c.id} />
  ));
  return (
    <div style={styles.box}>
      <h6>Clusters on Board</h6>
      {clusterList}
    </div>
  );
};

export default ClusterList;
