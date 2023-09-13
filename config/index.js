const db = require("./database");
const { getJWTPrivateAccessKey, getExpAccessToken } = require("./config");

module.exports = { db, getJWTPrivateAccessKey, getExpAccessToken };
