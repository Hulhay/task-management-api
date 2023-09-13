const mongoose = require("mongoose");

const logoutLogSchema = new mongoose.Schema({
  authIdentifier: {
    type: String,
    required: true,
  },
  isLogout: {
    type: Boolean,
    default: true,
  },
});

const LogoutLog = mongoose.model("LogoutLog", logoutLogSchema);

module.exports = { LogoutLog };
