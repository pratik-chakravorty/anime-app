const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandlers");
const {
  userValidationRules,
  loginValidationRules,
  profileValidationRules,
  postValidationRules,
  validate
} = require("../middleware/validator");
const auth = require("../middleware/auth");
const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");
const profileControllers = require("../controllers/profileControllers");
const postControllers = require("../controllers/postControllers");

//save user in DB and send back token
router.post(
  "/register",
  userValidationRules(),
  validate,
  catchErrors(userControllers.registerUsers)
);

//login the user
router.post(
  "/login",
  loginValidationRules(),
  validate,
  catchErrors(authControllers.loginUsers)
);

//get current logged in user
router.get(
  "/current",
  catchErrors(auth),
  catchErrors(authControllers.currentUser)
);

//get current logged in user profile
router.get(
  "/profile/me",
  catchErrors(auth),
  catchErrors(profileControllers.currentUserProfile)
);

router.get(
  "/profile/all",
  catchErrors(auth),
  catchErrors(profileControllers.getAllProfiles)
);

//create a user profile
router.post(
  "/profile",
  catchErrors(auth),
  profileValidationRules(),
  validate,
  catchErrors(profileControllers.createUserProfile)
);

//add items to watchlist
router.post(
  "/profile/watchlist",
  catchErrors(auth),
  catchErrors(profileControllers.addToWatchList)
);

//remove items to watchlist
router.delete(
  "/profile/watchlist/:id",
  catchErrors(auth),
  catchErrors(profileControllers.removeWatchlist)
);

router.get(
  "/profile/:id",
  catchErrors(auth),
  catchErrors(profileControllers.getProfileById)
);

router.get(
  "/posts/me",
  catchErrors(auth),
  catchErrors(postControllers.getCurrentUserPosts)
);

router.post(
  "/posts",
  catchErrors(auth),
  postValidationRules(),
  validate,
  catchErrors(postControllers.savePosts)
);

router.get(
  "/posts",
  catchErrors(auth),
  catchErrors(postControllers.getAllPosts)
);

router.get(
  "/posts/:id",
  catchErrors(auth),
  catchErrors(postControllers.getPostById)
);

module.exports = router;
