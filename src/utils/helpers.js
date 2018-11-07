module.exports = {
  isDistanceSmaler(pos1, pos2, threshold = 80) {
    return (
      Math.abs(pos2.left - pos1.left) < threshold ||
      Math.abs(pos2.top - pos1.top) < threshold
    );
  }
};
