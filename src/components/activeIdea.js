import React from "react";
import { labelIcon, textnoteIcon } from "../icons";

const ActiveIdea = ({ id, description, labels, textnote }) => {
  return (
    <div>
      <h6>{"Idea " + id}</h6>
      <div>
        <img alt="label" height="40" src={labelIcon} />
        {labels && labels.map(l => <span>{l + ", "}</span>)}
        <span>Edit</span>
      </div>
      <div>
        <img alt="textnote" height="40" src={textnoteIcon} />
        {textnote}
        <span>Edit</span>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default ActiveIdea;
