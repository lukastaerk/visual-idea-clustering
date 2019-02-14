const jsonld = require("jsonld");

const fs = require("fs");
const xmlContents = fs.readFileSync("./02-Spark-Spam-Detection.xml", {
  encoding: "utf-8"
});
//console.log(xmlContents)
jsonld.toRDF(xmlContents, { format: "application/rdf+xml" }, (err, nquads) => {
  // nquads is a string of N-Quads
  if (err) return console.log(err);
  //console.log(nquads)
  jsonld.fromRDF(nquads, { format: "application/n-quads" }, (err, doc) => {
    // doc is JSON-LD
    console.log(err, doc);
  });
});

// or using promises
//const doc = await jsonld.fromRDF(nquads, {format: 'application/n-quads'});
