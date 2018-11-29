const renameCluster = (id, name) => {
  return {
    type: "RENAME_CLUSTER",
    id,
    name
  };
};

const loadIdeas = ideas => {
  return {
    type: "LOAD_IDEAS",
    ideas
  };
};

const moveCluster = (id, position) => {
  return {
    type: "MOVE_CLUSTER",
    id,
    position
  };
};

const moveIdea = (source, sink, id, position) => {
  return {
    type: "MOVE_IDEA",
    source,
    sink,
    id,
    position
  };
};

export { moveIdea, moveCluster, loadIdeas, renameCluster };
