export default (
  state = { nextIdeas: [], boardIdeas: [], clusters: [] },
  { type: type, source: c1, sink: c2, id: id, position: p }
) => {
  switch (type) {
    case "MOVE_IDEA_BOARD_BOARD":
      const index = state.boardIdeas.findIndex(i => i.id === id);
      const idea = { ...state.boardIdeas[index], position: p };
      const boardIdeas = [
        ...state.boardIdeas.slice(0, index),
        idea,
        ...state.boardIdeas.slice(index + 1)
      ];
      return { ...state, boardIdeas: boardIdeas };
    default:
      return state;
  }
};
