import React from "react";
import { colors } from "../constants/index.json";
import { DropZone } from "./";
import Button from "@material-ui/core/Button";
import { clusterColor, button } from "./../constants/color";

var styles = {
  item: {
    background: clusterColor
  },
  box: {
    margin: "0 auto",
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 5,
    border: "1px solid",
    borderColor: colors.header.background,
    backgroundColor: button.main,
    color: button.text,
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
  var clusterList = clusters
    .sort((a, b) => {
      if (!a.name) return true; //undefined at the end of the list
      if (!b.name) return false;
      else return a.name.toLowerCase() > b.name.toLowerCase();
    })
    .map(c => (
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
