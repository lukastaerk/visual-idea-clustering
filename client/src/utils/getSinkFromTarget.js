const getSinkFromTarget = target => {
  let className = target.classList[0];
  if (!className) {
    return getSinkFromTarget(target.parentElement);
  }
  if (className.slice(0, 7) === "CLUSTER") {
    return {
      type: className.slice(0, 7),
      id: className.slice(7)
    };
  } else if (className.slice(0, 4) === "IDEA") {
    return {
      type: className.slice(0, 4),
      id: className.slice(4)
    };
  } else if (className === "BOARD") {
    return { type: className };
  }
  return getSinkFromTarget(target.parentElement);
};

export default getSinkFromTarget;
