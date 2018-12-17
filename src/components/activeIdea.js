import React from "react";
import { connect } from "react-redux";
import { updateIdea } from "../actions";
import { TextNote, LabelList } from "./";
import { H6, Section } from "../styledComponents";

const styles = {
  box: {
    margin: "10px 5px"
  },
  description: {
    marginLeft: "5px",
    fontSize: 14
  }
};
const ActiveIdea = ({
  id,
  container,
  description,
  labels,
  textnote,
  dispatch
}) => {
  return (
    <div style={styles.box}>
      <H6>{"Idea " + id}</H6>
      <LabelList
        id={id}
        labels={labels}
        handleSave={obj => dispatch(updateIdea(id, container, obj))}
      />
      <TextNote
        id={id}
        textnote={textnote}
        handleSave={obj => dispatch(updateIdea(id, container, obj))}
      />
      <Section>Description:</Section>
      <div style={styles.description}>{description}</div>
    </div>
  );
};

export default connect()(ActiveIdea);
