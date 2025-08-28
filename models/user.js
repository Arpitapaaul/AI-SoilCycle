const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  otp: { type: String }, // temporary OTP
});

module.exports = mongoose.model("User", userSchema);
