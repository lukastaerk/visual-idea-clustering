import React from "react";
import { connect } from "react-redux";
import { renderIdeas } from "./";
import { turnOverStack, turnBackStack } from "../actions";
import { H6, Box, EditButton, Number } from "../styledComponents";

const IdeaStack = ({ stackIdeas, type, dispatch }) => {
  const DisplayIdeas = renderIdeas(stackIdeas, { type });
  return (
    <div>
      <H6 bold={true}>
        {"Idea Stack"} <Number>{stackIdeas.length}</Number>
      </H6>
      <p style={{ textAlign: "center" }}>
        <EditButton onClick={() => dispatch(turnBackStack())}>{"<"}</EditButton>
        <EditButton onClick={() => dispatch(turnOverStack())}>{">"}</EditButton>
      </p>
      <Box style={{ padding: 10 }}>{DisplayIdeas}</Box>
    </div>
  );
};

export default connect()(IdeaStack);
