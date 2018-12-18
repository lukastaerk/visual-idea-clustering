const activeIdea = (state = null, { type, id, container }) => {
  switch (type) {
    case "SET_ACTIVE_IDEA":
      return { id, container };
    case "REMOVE_ACTIVE_IDEA":
      return null;
    default:
      return state;
  }
};

export default activeIdea;
