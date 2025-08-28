const User = require("../models/user");
const bcrypt = require("bcrypt");

// 🔹 Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 🔹 Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ msg: "Phone already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, phone, password: hashedPassword });
    await user.save();

    res.json({ success: true, msg: "Registration successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 Login with Password
exports.loginWithPassword = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    res.json({ success: true, msg: "Login successful (password)" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    let user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ msg: "User not registered" });

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    console.log(`📲 OTP for ${phone}: ${otp}`); // simulate SMS
    res.json({ success: true, msg: "OTP sent" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, msg: "Invalid OTP" });
    }

    user.otp = null; // clear OTP
    await user.save();

    res.json({ success: true, msg: "Login successful (OTP)" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
