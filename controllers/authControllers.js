const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.loginUsers = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  //check if user exists
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }
  //compare password with hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }
  //sign jwt and send token as a response
  const payload = {
    user: {
      id: user.id
    }
  };
  //sign jwt
  jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};

exports.currentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
