import React from "react";
import { renderIdeas } from "./idea";
import { button } from "../constants/color";
import { H6, Box, IdeaContainer } from "../styledComponents";

const IdeaStack = ({ nextIdeas, name, type }) => {
  const ideasDisplay = renderIdeas(nextIdeas, { type: type }, type);
  return (
    <Box color={button.text} style={{ padding: 10 }}>
      <H6> {name}</H6>
      <IdeaContainer>{ideasDisplay}</IdeaContainer>
    </Box>
  );
};

export default IdeaStack;
