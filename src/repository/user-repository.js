const User = require("../models/user-model");

const getUser = async (id) => {
  return await User.findById(id);
};

const getAllUsers = async () => {
  return await User.find();
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  let user = await User.create(userData);
  user = await User.findById(user.id).select("-password");
  return user;
};

const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const userRepository = {
  getUser: getUser,
  getAllUsers: getAllUsers,
  findByEmail: findByEmail,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

module.exports = userRepository;
