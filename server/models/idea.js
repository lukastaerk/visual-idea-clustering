const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  id: {
    type: String
  }
});

module.exports = mongoose.model("Idea", IdeaSchema);
