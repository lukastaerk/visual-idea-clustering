export default (
  state = { stackIdeas: [], boardIdeas: [], clusters: [] },
  { type: type, source: c1, sink: c2, id: id, position: p }
) => {
  let index, boardIdeas, stackIdeas, clusters, idea;
  switch (type) {
    case "MOVE_IDEA_BOARD_BOARD":
      index = state.boardIdeas.findIndex(i => i.id === id);
      idea = { ...state.boardIdeas[index], position: p };
      boardIdeas = [
        ...state.boardIdeas.slice(0, index),
        idea,
        ...state.boardIdeas.slice(index + 1)
      ];
      return { ...state, boardIdeas: boardIdeas };
    case "MOVE_IDEA_STACK_BOARD":
      [idea, stackIdeas] = removeElement(id, state.stackIdeas);
      boardIdeas = [...state.boardIdeas, { ...idea, position: p }];
      return { ...state, boardIdeas: boardIdeas, stackIdeas: stackIdeas };
    default:
      return state;
  }
};

/**
 * input @array - a list mit object holding an id
 * return the object holding the id and the array without the object
 **/
function removeElement(id, array) {
  let index = array.findIndex(a => a.id === id);
  let resultArray = [...array.slice(0, index), ...array.slice(index + 1)];
  return [array[index], resultArray];
}
