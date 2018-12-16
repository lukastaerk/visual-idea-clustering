const activeIdea = (state = null, { type, id, description }) => {
  switch (type) {
    case "SET_ACTIVE_IDEA":
      return { id, description };
    case "MOVE_IDEA":
      return state;
    default:
      return state;
  }
};

export default activeIdea;
