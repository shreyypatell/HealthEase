const express = require("express");
const router = express.Router();
const { badCookie, cookieAuthEmail } = require("../middleware/cookieAuth");

const {
  login,
  signup,
  verify,
  sendForgotPasswordOTP,
  verifyForgotPassword,
  changePassword,
  logout,
  updateInfo,
} = require(`../controllers/userController`);

router.post("/signup", badCookie, signup);
router.post("/verify", badCookie, verify);
router.post("/login", badCookie, login);
router.post("/sendOTP", badCookie, sendForgotPasswordOTP);
router.post("/verify_forgot_password", badCookie, verifyForgotPassword);
router.post("/change_password", badCookie, cookieAuthEmail, changePassword);
router.post("/update_info", badCookie, updateInfo);
router.get(`/logout`, badCookie, logout);

module.exports = router;
