const express = require("express");
const router = express.Router();
const {
  login,
  resetPassword,
  forgotPassword,
} = require("../controller/authController");

router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);
router.route("/login").post(login);
module.exports = router;
