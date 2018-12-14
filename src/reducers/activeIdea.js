const activeIdea = (state = null, { type, id }) => {
  switch (type) {
    case "SET_ACTIVE_IDEA":
      return id;
    default:
      return id ? id : null;
  }
};

export default activeIdea;
