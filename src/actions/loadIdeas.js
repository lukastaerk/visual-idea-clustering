export const loadIdeas = newIdeas => dispatch => {
  dispatch({
    type: "LOAD_IDEAS",
    ideas: newIdeas
  });
};
