const User = require('../models/userModel');

const userRepository = {
  getUser: getUser,
  getUsers: getUsers,
  findByEmail: findByEmail,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

module.exports = userRepository;

async function getUser(id) {
  try {
    return await User.findById(id);
  } catch (error) {
    return error;
  }
}

async function getUsers() {
  try {
    return await User.find();
  } catch (error) {
    return error;
  }
}

async function findByEmail(email) {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    return error;
  }
}

async function createUser(data) {
  try {
    let user = await User.create(data);
    user = await User.findById(user.id).select('-password');
    return user;
  } catch (error) {
    return error;
  }
}

async function updateUser(id, data) {
  try {
    return await User.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    return error;
  }
}

async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
}
