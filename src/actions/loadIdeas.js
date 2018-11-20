export const loadIdeas = newideas => dispatch => {
  dispatch({
    type: "LOAD_IDEAS",
    ideas: newideas
  });
};
