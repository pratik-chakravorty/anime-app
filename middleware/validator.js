const { check, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    //name is not empty
    check("name", "Name is required")
      .not()
      .isEmpty(),
    //email is in proper format
    check("email", "Please include a valid email").isEmail(),
    //password length is 6 characters min
    check(
      "password",
      "Please enter passwords with 5 or more characters"
    ).isLength({ min: 5 })
  ];
};

const loginValidationRules = () => {
  return [
    //email is in proper format
    check("email", "Please include a valid email").isEmail(),
    //password length is 6 characters min
    check(
      "password",
      "Please enter passwords with 5 or more characters"
    ).isLength({ min: 5 })
  ];
};

const profileValidationRules = () => {
  return [
    check("aboutMe", "This field is required")
      .not()
      .isEmpty(),
    check("location", "This field is required")
      .not()
      .isEmpty()
  ];
};

const postValidationRules = () => {
  return [
    check("title", "This field is required")
      .not()
      .isEmpty(),
    check("description", "This field is required")
      .not()
      .isEmpty()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  console.log("hii");
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  loginValidationRules,
  profileValidationRules,
  postValidationRules,
  validate
};
