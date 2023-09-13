require("dotenv").config();

const getJWTPrivateAccessKey = () => {
  return process.env.JWT_PRIVATE_ACCESS_KEY;
};

const getExpAccessToken = () => {
  return process.env.JWT_EXP_ACCESS_TOKEN;
};

module.exports = {
  getJWTPrivateAccessKey,
  getExpAccessToken,
};
