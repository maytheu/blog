const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    unique: 1,
    required: true,
  },
  headline: String,
  blog: {
    type: String,
    required: true,
  },
  publish: {
    type: Boolean,
    default: 0,
    required: true,
  },
  publishedDate: Date,
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Array,
    default: [],
  },
  commentCount: {
    type: Number,
    default: 0,
  },
});

mongoose.model("blogs", blogSchema);
