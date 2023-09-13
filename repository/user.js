const { User } = require("../models");
const { generateUUID } = require("../utils");

const insertUserToDB = async (req) => {
  const { name, email, password } = req;

  const user = new User({
    id: generateUUID(),
    name: name,
    email: email,
    password: password,
  });

  const response = await user.save();

  return response;
};

const getUserByEmailFromDB = async (email) => {
  const response = await User.find({ email: email });
  return response[0];
};

module.exports = {
  insertUserToDB,
  getUserByEmailFromDB,
};
