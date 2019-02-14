var FileSaver = require("file-saver");

export const downloadState = state => {
  let date = new Date();
  var blob = new Blob([JSON.stringify(convert(state), null, 2)], {
    type: "application/json;charset=utf-8"
  });
  FileSaver.saveAs(
    blob,
    "Clustering-State-" +
      date
        .toGMTString()
        .split(" ")
        .join("-") +
      ".json"
  );
};

function convert(state) {
  var { boardIdeas, clusters } = state;
  var ideas = boardIdeas.map(({ title, ...idea }) => ({
    ...idea,
    cluster: null
  }));
  clusters.forEach(c => {
    ideas = [...ideas, ...c.ideas.map(i => ({ ...i, cluster: c.id }))];
  });
  clusters = clusters.map(({ id, name, position }) => ({ id, name, position }));
  return { ideas, clusters };
}

export default downloadState;
