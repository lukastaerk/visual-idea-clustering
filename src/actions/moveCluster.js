export const moveCluster = (id, position) => dispatch => {
  dispatch({
    type: "MOVE_CLUSTER",
    id: id,
    position: position
  });
};
