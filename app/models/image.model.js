const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ImageSchema = new Schema(
  {
    title: String,
    filename: String,
    comment: String
  },
  { timestamps: true }
);

const ImageModel = mongoose.model("image", ImageSchema);
module.exports = ImageModel;
