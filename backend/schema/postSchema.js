const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  postId: { type: String, required: true },
  username: { type: String, required: true },
  mind: { type: String },
  likes: { type: Number, required: true }
});

module.exports = mongoose.model("PostSchema", postSchema)