const Profile = require("../models/Profile");
const User = require("../models/User");

exports.currentUserProfile = async (req, res) => {
  const profile = await Profile.findOne({
    user: req.user.id
  }).populate("user", ["name", "avatar"]);

  if (!profile) {
    return res.status(400).json({ msg: "There is no profile for this user" });
  }
  res.json(profile);
};

exports.getAllProfiles = async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  if (!profiles) {
    return res.status(400).json({ msg: "There are no profiles" });
  }
  res.json(profiles);
};

exports.createUserProfile = async (req, res) => {
  const { aboutMe, location } = req.body;
  const profileFields = {};
  if (aboutMe) {
    profileFields.aboutMe = aboutMe;
  }
  if (location) {
    profileFields.location = location;
  }

  let profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, upsert: true }
  );
  res.json(profile);
};

exports.addToWatchList = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  console.log(profile);
  const newWatchlist = {
    mal_id: req.body.mal_id,
    title: req.body.title,
    image_url: req.body.image_url,
    episodes: req.body.episodes
  };
  console.log(profile);
  profile.watchlist.unshift(newWatchlist);
  await profile.save();
  res.json(profile.watchlist);
};

exports.removeWatchlist = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  profile.watchlist = profile.watchlist.filter(
    item => item.mal_id !== req.params.id
  );
  await profile.save();
  res.json(profile.watchlist);
};

exports.addToBlackList = async (req, res) => {
  const profile = await Profile.findById(req.user.id);
  profile.blackList.unshift(req.body);
  await profile.save();
  res.json({ msg: "Blacklist added!" });
};
