const Profile = require("../models/Profile");

exports.currentUserProfile = async (req, res) => {
  const profile = await Profile.findOne({
    user: req.user.id
  }).populate("user", ["name", "avatar"]);

  res.json(profile);
};

exports.getAllProfiles = async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  //remove the currently logged in user's profile
  const finalProfiles = profiles.filter(
    profile => profile.user._id.toString() !== req.user.id
  );
  console.log(finalProfiles);
  if (!finalProfiles) {
    return res.status(400).json({ msg: "There are no profiles" });
  }
  res.json(finalProfiles);
};

exports.getProfileById = async (req, res) => {
  const profile = await Profile.findById(req.params.id).populate("user", [
    "name",
    "avatar"
  ]);
  return res.json(profile);
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
  const newProfileWatchlist = profile.watchlist.filter(
    item => item.mal_id !== Number(req.params.id)
  );
  profile.watchlist = newProfileWatchlist;
  await profile.save();
  res.json(profile.watchlist);
};
