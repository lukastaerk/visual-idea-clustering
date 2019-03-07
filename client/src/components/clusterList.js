import React from "react";
import { DropZone } from "./";
import { button, ideaColor } from "../constants/color";
import { ClusterButton, Box, H6, Number } from "../styledComponents";

const Item = ({ id, name, numberOfIdeas }) => {
  return (
    <a href={`#${id}`} style={{ textDecoration: "none" }}>
      <DropZone sink={{ type: "CLUSTER", id: id }} dropColor={ideaColor}>
        <ClusterButton>
          <H6 noCenter={true}>
            {name}
            <Number>{numberOfIdeas}</Number>
          </H6>
        </ClusterButton>
      </DropZone>
    </a>
  );
};

const ClusterList = ({ clusters = [] }) => {
  var clusterList = clusters
    .sort((a, b) => {
      if (!a.name && !b.name) return a.ideas.length < b.ideas.length;
      if (!a.name) return true; //undefined at the end of the list
      if (!b.name) return false;
      else return a.name.toLowerCase() > b.name.toLowerCase();
    })
    .map(c => (
      <Item
        key={"list" + c.id}
        name={c.name || "CLUSTER"}
        id={c.id}
        numberOfIdeas={c.ideas.length}
      />
    ));
  return (
    <Box color={button.text} backgroundColor={button.main}>
      <H6 bold={true}>Clusters</H6>
      {clusterList}
    </Box>
  );
};

export default ClusterList;
