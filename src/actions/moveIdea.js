export const moveIdea = (source, sink, id, position) => dispatch => {
  dispatch({
    type: "MOVE_IDEA",
    source: source,
    sink: sink,
    id: id,
    position: position
  });
};
