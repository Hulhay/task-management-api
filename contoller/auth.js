const bcrypt = require("bcrypt");
const { buildResponse, msg, generateTokens } = require("../utils");
const { validateRegister, validateLogin } = require("./validation");
const {
  getUserByEmailFromDB,
  insertUserToDB,
  insertLogoutLogToDB,
} = require("../repository");
const { buildRegisterResponse, buildLoginResponse } = require("./helper");

const register = async (req, res) => {
  const err = validateRegister(req.body);
  if (err) {
    return buildResponse(res, 422, err, null, null);
  }

  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const registerRequest = {
    name: name,
    email: email,
    password: encryptedPassword,
  };

  try {
    const userExists = await getUserByEmailFromDB(email);
    if (userExists) {
      return buildResponse(res, 422, msg.errEmailExist, null, null);
    }

    const response = await insertUserToDB(registerRequest);
    return buildResponse(
      res,
      201,
      msg.success,
      buildRegisterResponse(response),
      null
    );
  } catch (err) {
    return buildResponse(res, 500, msg.errFailedRegister, null, null);
  }
};

const login = async (req, res) => {
  const err = validateLogin(req.body);
  if (err) {
    return buildResponse(res, 422, err, null, null);
  }

  const { email, password } = req.body;

  try {
    const user = await getUserByEmailFromDB(email);
    if (!user) {
      return buildResponse(res, 404, msg.errEmailNotFound, null, null);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return buildResponse(res, 422, msg.errWrongPassword, null, null);
    }

    const { accessToken, accessTokenExp } = generateTokens(user);

    return buildResponse(
      res,
      200,
      msg.success,
      buildLoginResponse(accessToken, accessTokenExp),
      null
    );
  } catch (err) {
    return buildResponse(res, 500, msg.errfailedLogin, null, null);
  }
};

const logout = async (req, res) => {
  const authIdentifier = req.tokenData.authIdentifier;

  try {
    await insertLogoutLogToDB(authIdentifier);
    return buildResponse(res, 200, msg.success, null, null);
  } catch (err) {
    return buildResponse(res, 500, msg.errfailedLogout, null, null);
  }
};

module.exports = { register, login, logout };
