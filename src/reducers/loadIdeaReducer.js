export default (
  state = { stackIdeas: [], boardIdeas: [], clusters: [] },
  { type: type, ideas: ideas }
) => {
  switch (type) {
    case "LOAD_IDEAS":
      const stackIdeas = [...state.stackIdeas, ...ideas];
      return { ...state, stackIdeas: stackIdeas };
    default:
      return state;
  }
};
