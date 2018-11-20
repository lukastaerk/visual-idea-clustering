export default (
  state = { nextIdeas: [], boardIdeas: [], clusters: [] },
  { type: type, ideas: ideas }
) => {
  switch (type) {
    case "LOAD_IDEAS":
      const nextIdeas = [...state.nextIdeas, ...ideas];
      return { ...state, nextIdeas };
    default:
      return state;
  }
};
