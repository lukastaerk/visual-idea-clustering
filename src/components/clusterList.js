import React from "react";
import { DropZone } from "./";
import { button } from "../constants/color";
import { ClusterButton, Box } from "../styledComponents";

const Item = ({ id, name }) => {
  return (
    <DropZone sink={{ type: "CLUSTER", id: id }}>
      <a href={`#${id}`} style={{ textDecoration: "none" }}>
        <ClusterButton>{name}</ClusterButton>
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
    <Box color={button.text} backgroundColor={button.main}>
      <h6>Clusters on Board</h6>
      {clusterList}
    </Box>
  );
};

export default ClusterList;
