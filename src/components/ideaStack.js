import React from "react";
import { renderIdeas } from "./idea";
import { colors } from "./../constants/index.json";
import { button } from "../constants/color";

var styles = {
  ideaStack: {
    position: "relative",
    margin: "auto",
    marginTop: 20,
    marginRight: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: colors.header.background,
    width: 150,
    height: 170,
    backgroundColor: button.main
  },
  ideaContainer: {
    position: "relative",
    margin: "0 auto",
    width: 120,
    height: 120
  },
  h6: {
    color: button.text,
    textAlign: "center"
  }
};

const IdeaStack = ({ nextIdeas, name, type }) => {
  const ideasDisplay = renderIdeas(nextIdeas, { type: type }, type);
  return (
    <div style={styles.ideaStack}>
      <h6 style={styles.h6}>{name}</h6>
      <div style={styles.ideaContainer}>{ideasDisplay}</div>
    </div>
  );
};

export default IdeaStack;
