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

const turnOverStack = () => ({
  type: "TURN_OVER_STACK"
});

const turnBackStack = () => ({
  type: "TURN_BACK_STACK"
});

const resetState = () => ({
  type: "RESET_STATE"
});

const setActiveIdea = (id, container) => ({
  type: "SET_ACTIVE_IDEA",
  id,
  container
});

const removeAvtiveIdea = () => ({
  type: "REMOVE_ACTIVE_IDEA"
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
  turnOverStack,
  turnBackStack,
  resetState,
  setActiveIdea,
  updateIdea,
  removeAvtiveIdea
};
