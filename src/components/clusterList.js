import React from "react";
import { colors } from "../constants/index.json";
import { DropZone } from "./";
import Button from "@material-ui/core/Button";

var styles = {
  item: {
    background: colors.cluster.background
  },
  box: {
    margin: "0 auto",
    marginTop: 20,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: colors.header.background,
    backgroundColor: colors.board.background,
    maxWidth: 180,
    overflow: "hidden",
    textAlign: "center"
  }
};

const Item = ({ id, name }) => {
  return (
    <DropZone sink={{ type: "CLUSTER", id: id }}>
      <a href={`#${id}`}>
        <Button style={styles.item} variant="outlined" fullWidth={true}>
          {name}
        </Button>
      </a>
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
