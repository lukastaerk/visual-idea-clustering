const CHI19S1_ideas = require("../data/CHI19S1-ideas-new.json");
const jsonld = require("jsonld");
var context = {
  graph: "@graph",
  id: "@id"
};

export async function loadData() {
  console.log(CHI19S1_ideas);
  const data = await jsonld.compact(CHI19S1_ideas, context);
  return data;
}
