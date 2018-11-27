export const renameCluster = (id, newName) => dispatch => {
  dispatch({
    type: "RENAME_CLUSTER",
    id: id,
    name: newName
  });
};
