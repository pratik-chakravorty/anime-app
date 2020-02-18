const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

exports.registerUsers = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ errors: [{ msg: "User already exists!" }] });
  }
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm"
  });
  //create user obj
  user = new User({ name, email, password, avatar });
  //generate hash
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  //save user to DB
  await user.save();

  //sign jwt and send a token response
  const payload = {
    user: {
      id: user.id
    }
  };

  //sign jwt -> change the expiration in 1 hour or more
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
