const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: Number,
    title: String,
    description: String,
    date: String
  }
);

module.exports = mongoose.model("Data", DataSchema);