var FileSaver = require("file-saver");

export const downloadState = state => {
  let date = new Date();
  var blob = new Blob([JSON.stringify(state, null, 2)], {
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

export default downloadState;
