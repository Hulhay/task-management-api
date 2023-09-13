const { v4, validate } = require("uuid");

const generateUUID = () => {
  return v4();
};

const validateUUID = (uuid) => {
  return validate(uuid);
};

module.exports = { generateUUID, validateUUID };
