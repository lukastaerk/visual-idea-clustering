import React from "react";
import { connect } from "react-redux";
import { Idea } from "./";
import { turnOverStack, turnBackStack } from "../actions";
import {
  H6,
  Box,
  IdeaContainer,
  EditButton,
  Number
} from "../styledComponents";

const IdeaStack = ({ nextIdea, name, type, stackLength, dispatch }) => {
  return (
    <Box style={{ padding: 10 }}>
      <H6 bold={true}>
        {" "}
        {name} <Number>{stackLength}</Number>
      </H6>

      <IdeaContainer>
        {nextIdea ? (
          <Idea
            container={{ type }}
            dropZone={type}
            key={nextIdea.id}
            data={nextIdea}
          />
        ) : null}
      </IdeaContainer>
      <p>
        <EditButton onClick={() => dispatch(turnBackStack())}>{"<"}</EditButton>
        <EditButton onClick={() => dispatch(turnOverStack())}>{">"}</EditButton>
      </p>
    </Box>
  );
};

export default connect()(IdeaStack);
