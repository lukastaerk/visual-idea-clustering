import React from "react";
import { connect } from "react-redux";
import { updateIdea } from "../actions";
import { TextNote, LabelList } from "./";
import { H6, Section } from "../styledComponents";

const styles = {
  box: {
    margin: "10px 5px"
  },
  content: {
    marginLeft: "5px",
    fontSize: 14
  }
};
const ActiveIdea = ({
  id,
  container,
  content,
  labels,
  textnote,
  title,
  dispatch
}) => {
  return (
    <div style={styles.box}>
      <H6>{title || "Idea"}</H6>
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
      <Section>content:</Section>
      <div style={styles.content}>{content}</div>
    </div>
  );
};

export default connect()(ActiveIdea);
