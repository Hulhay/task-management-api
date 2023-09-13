const { LogoutLog } = require("../models");

const insertLogoutLogToDB = async (authIdentifier) => {
  const logoutLog = new LogoutLog({
    authIdentifier: authIdentifier,
    isLogout: true,
  });

  const response = await logoutLog.save();

  return response;
};

const getLogoutLogByAuthIdentifier = async (authIdentifier) => {
  const response = await LogoutLog.find({ authIdentifier: authIdentifier });
  return response[0];
};

module.exports = { insertLogoutLogToDB, getLogoutLogByAuthIdentifier };
