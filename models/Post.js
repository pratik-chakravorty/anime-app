const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  list: [
    {
      mal_id: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      image_url: {
        type: String,
        required: true
      },
      episodes: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Post = mongoose.model("post", postSchema);
