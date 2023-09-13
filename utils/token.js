const jwt = require("jsonwebtoken");
const { getJWTPrivateAccessKey, getExpAccessToken } = require("../config");
const { generateUUID } = require("./utils");

const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    authIdentifier: generateUUID(),
  };
  const accessToken = jwt.sign(payload, getJWTPrivateAccessKey(), {
    expiresIn: getExpAccessToken(),
  });

  const exp = Date.now() + expiresInToMilliseconds(getExpAccessToken());

  const accessTokenExp = new Date(exp).toISOString();

  return { accessToken, accessTokenExp };
};

const expiresInToMilliseconds = (expiresIn) => {
  const units = {
    s: 1000, // seconds
    m: 60 * 1000, // minutes
    h: 60 * 60 * 1000, // hours
    d: 24 * 60 * 60 * 1000, // days
  };

  const unit = expiresIn.slice(-1);
  const value = parseInt(expiresIn);

  return value * units[unit];
};

module.exports = { generateTokens };
