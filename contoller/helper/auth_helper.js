const { formatDateString, dateTimeFormat } = require("../../utils");

const buildRegisterResponse = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

const buildLoginResponse = (accessToken, expAccessToken) => {
  return {
    access_token: accessToken,
    access_token_exp: formatDateString(expAccessToken, dateTimeFormat),
  };
};

module.exports = { buildRegisterResponse, buildLoginResponse };
