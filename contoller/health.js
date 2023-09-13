const { buildResponse } = require("../utils");

const getHealth = (_, res) => {
  buildResponse(res, 200, "I am feeling fine", null, null);
};

module.exports = { getHealth };
