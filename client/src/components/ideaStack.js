import React from "react";
import { renderIdeas } from "./idea";
import { H6, Box, IdeaContainer, EditButton } from "../styledComponents";

const IdeaStack = ({ nextIdeas, name, type }) => {
  const ideasDisplay = renderIdeas(nextIdeas, { type: type }, type);
  return (
    <Box style={{ padding: 10 }}>
      <H6> {name}</H6>
      <IdeaContainer>{ideasDisplay}</IdeaContainer>
      <p>
        <EditButton fullWidth={false}>{"<"}</EditButton>
        <EditButton fullWidth={false}>{">"}</EditButton>
      </p>
    </Box>
  );
};

export default IdeaStack;
