const Post = require("../models/Post");
const User = require("../models/User");

exports.getCurrentUserPosts = async (req, res) => {
  const posts = await Post.findOne({ user: req.user.id });
  if (!posts) {
    return res.status(400).json({ msg: "No  posts made by the user" });
  }
  res.json(posts);
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("user", ["name", "avatar"]);
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", [
    "name",
    "avatar"
  ]);
  if (!post) {
    return res.status(400).json({ msg: "No post found" });
  }
  res.json(post);
};

exports.savePosts = async (req, res) => {
  const { title, description, list } = req.body;
  if (!list || list.length === 0) {
    return res.status(400).json({ msg: "No recommendation list provided" });
  }
  const user = await User.findById(req.user.id).select("-password");
  let post = new Post({
    title,
    description,
    list,
    user
  });
  post.save();
  res.json(post);
};

exports.removeUserPost = async (req, res) => {
  const posts = await Posts.find({ user: req.user.id });
  const filteredPosts = posts.filter(
    item => item._id !== Number(req.params.id)
  );
  posts = filteredPosts;
  await posts.save();
  res.json(posts);
};
