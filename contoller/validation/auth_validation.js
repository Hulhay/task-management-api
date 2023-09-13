const { msg, emailFormat } = require("../../utils");

const validateRegister = (req) => {
  const { name, email, password } = req;

  if (!name) {
    return msg.errEmptyName;
  }

  if (!email) {
    return msg.errEmptyEmail;
  }

  if (!emailFormat.test(email)) {
    return msg.errEmailFormat;
  }

  if (!password) {
    return msg.errEmptyPassword;
  }

  if (password.length < 8) {
    return msg.errShortPassword;
  }

  return "";
};

const validateLogin = (req) => {
  const { email, password } = req;

  if (!email) {
    return msg.errEmptyEmail;
  }

  if (!emailFormat.test(email)) {
    return msg.errEmailFormat;
  }

  if (!password) {
    return msg.errEmptyPassword;
  }

  return "";
};

module.exports = { validateRegister, validateLogin };
