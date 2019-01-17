export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
    // Ignore write errors.
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return {
      clustering: {
        present: JSON.parse(serializedState),
        past: [],
        future: []
      },
      activeIdea: null
    };
  } catch (err) {
    return undefined;
  }
};
