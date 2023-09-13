const jwt = require("jsonwebtoken");
const { buildResponse, msg } = require("../utils");
const { getJWTPrivateAccessKey } = require("../config");
const { getLogoutLogByAuthIdentifier } = require("../repository");

const authorizeJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return buildResponse(res, 401, msg.errEmptyAuthorization, null, null);
  }

  const auth = authHeader.split(" ");
  if (auth.length < 2) {
    return buildResponse(res, 401, msg.errEmptyAuthorization, null, null);
  }

  if (auth[0] !== "Bearer") {
    return buildResponse(res, 401, msg.errInvalidAuthorization, null, null);
  }

  try {
    const tokenData = jwt.verify(auth[1], getJWTPrivateAccessKey());
    
    const existAuthIdentifier = await checkAuthIdentifier(
      tokenData.authIdentifier
    );
    if (existAuthIdentifier) {
      return buildResponse(res, 401, msg.errAlreadyLogout, null, null, null);
    }

    req.tokenData = tokenData;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return buildResponse(res, 401, msg.errExpiredToken, null, null);
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return buildResponse(res, 401, msg.errInvalidToken, null, null);
    }
    return buildResponse(res, 500, msg.errSomethingWentWrong, null, null);
  }
};

const checkAuthIdentifier = async (authIdentifier) => {
  try {
    const exists = await getLogoutLogByAuthIdentifier(authIdentifier);
    if (exists) {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

module.exports = { authorizeJWT };
