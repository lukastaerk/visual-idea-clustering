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

const setActiveIdea = (id, container) => ({
  type: "SET_ACTIVE_IDEA",
  id,
  container
});

const updateIdea = (id, container, updateObj) => ({
  type: "UPDATE_IDEA",
  id,
  container,
  updateObj
});

export {
  moveIdea,
  moveCluster,
  loadIdeas,
  renameCluster,
  resetState,
  setActiveIdea,
  updateIdea
};
