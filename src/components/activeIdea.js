import React from "react";
import { connect } from "react-redux";
import { updateIdea } from "../actions";
import { TextNote, LabelList } from "./";

const ActiveIdea = ({
  id,
  container,
  description,
  labels,
  textnote,
  dispatch
}) => {
  return (
    <div>
      <h6>{"Idea " + id}</h6>
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
      <p>{description}</p>
    </div>
  );
};

export default connect()(ActiveIdea);
