const express = require("express");
const router = express.Router();
const { registerUser, loginWithPassword, sendOtp, verifyOtp } = require("../controllers/authcontroller");

router.post("/register", registerUser);
router.post("/login-password", loginWithPassword);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
