const renameCluster = (id, name) => ({
  type: "RENAME_CLUSTER",
  id,
  name
});

const loadIdeas = ideas => ({
  type: "LOAD_IDEAS",
  ideas
});

const moveCluster = (id, position) => ({
  type: "MOVE_CLUSTER",
  id,
  position
});

const moveIdea = (source, sink, id, position) => ({
  type: "MOVE_IDEA",
  source,
  sink,
  id,
  position
});

const resetState = () => ({
  type: "RESET_STATE"
});

const setActiveIdea = id => ({
  type: "SET_ACTIVE_IDEA",
  id
});

export {
  moveIdea,
  moveCluster,
  loadIdeas,
  renameCluster,
  resetState,
  setActiveIdea
};
