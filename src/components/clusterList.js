import React from "react";
import { colors } from "../constants/index.json";
import { DropZone } from "./";
import { clusterColor, button } from "./../constants/color";

var styles = {
  item: {
    background: clusterColor,
    border: `.5px solid ${button.dark}`,
    borderRadius: 5,
    padding: "5px 0px 5px 0px",
    color: button.text
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
      <a href={`#${id}`} style={{ textDecoration: "none" }}>
        <div style={styles.item}>{name}</div>
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
