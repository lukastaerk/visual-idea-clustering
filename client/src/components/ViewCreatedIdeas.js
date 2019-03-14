import React from "react";
import { H6 } from "../styledComponents";
import { Idea } from "./";

const ViewCreatedIdeas = ({ ideas = [] }) => {
  const displayIdeas = ideas.map(idea => <CreatedIdea {...idea} />);
  return (
    <div>
      <H6>Created Ideas</H6>
      {displayIdeas}
    </div>
  );
};

const CreatedIdea = ({ title, content, image }) => {
  return (
    <div>
      <Idea data={{ title, content }} />
      <img src={image} alt="image" />
    </div>
  );
};

export default ViewCreatedIdeas;
