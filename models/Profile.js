const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user"
  },
  aboutMe: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  watchlist: [
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
  ],
  blacklist: [
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

module.exports = Profile = mongoose.model("profile", profileSchema);
