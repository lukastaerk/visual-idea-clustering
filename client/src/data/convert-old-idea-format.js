const uuid = require("uuid");
const fs = require("fs");
const rawData = fs.readFileSync("CHI19S1-ideas.json");

const context = {
  "@context": {
    hasCreator: {
      "@id": "gi2mo:hasCreator",

      "@type": "@id"
    },

    created: "dcterms:created",

    concept: {
      "@id": "inov:concept",

      "@type": "@id"
    },

    modificationType: "gi2mo:modificationType",

    gi2mo: "http://purl.org/gi2mo/ns#",

    versionInfo: {
      "@id": "gi2mo:versionInfo",

      "@type": "@id"
    },

    versionDate: "gi2mo:versionDate",

    versionNumber: "gi2mo:versionNumber",

    content: "gi2mo:content",

    startIndex: "inov:startIndex",

    hasStatus: {
      "@id": "gi2mo:hasStatus",

      "@type": "@id"
    },

    isCurrentVersion: "gi2mo:isCurrentVersion",

    hasSubmissionMethod: {
      "@id": "gi2mo:hasSubmissionMethod",

      "@type": "@id"
    },

    conceptSurface: "concept:Surface",

    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",

    endIndex: "inov:endIndex",

    hasIdeaContest: {
      "@id": "gi2mo:hasIdeaContest",

      "@type": "@id"
    },

    linkedConcept: {
      "@id": "inov:linkedConcept",

      "@type": "@id"
    },

    challenge: {
      "@id": "inov:challenge",

      "@type": "@id"
    },

    dcterms: "http://purl.org/dc/terms/",

    inov: "http://purl.org/innovonto/types#"
  }
};
var ideas = JSON.parse(rawData);
const ideasNewFormat = ideas.map(idea => ({
  "@id": "http://purl.org/innovonto/ideas/" + uuid.v4(),
  content: idea.description,
  concept: idea.validatedConcepts.map(c => ({
    "@id": "http://purl.org/innovonto/concepts/" + uuid.v4(),
    conceptSurface: c.token,
    linkedConcept: c.uri
  }))
}));
const exportFormat = JSON.stringify(
  { ...context, "@graph": ideasNewFormat },
  null,
  2
);
fs.writeFileSync("CHI19S1-ideas-new.json", exportFormat);
