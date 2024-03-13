const asyncHandler = require("express-async-handler");
const User = require("../../models/users/user-model");
const bcrypt = require("bcrypt");
const validator = require("validator");

//*Get the user
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

//*Register a user, access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, position, email, password } = req.body;
    if (!firstname.trim() || !lastname.trim() || !position.trim() || !email.trim() || !password) {
      throw new Error("All fields are mandatory!");
    }

    if (!validator.isEmail(email.trim())) {
      res.status(400);
      throw new Error("Invalid email format");
    }

    const userAvailable = await User.findOne({ email: email.trim() });
    if (userAvailable) {
      throw new Error("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      position: position.trim(),
      email: email.trim(),
      password: hashedPassword,
    });
    res.status(201).json({ _id: user.id, email: user.email });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

//*Update the user, access public
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, ...otherUpdates } = req.body;

    if (email && !validator.isEmail(email.trim())) {
      res.status(400);
      throw new Error("Invalid email format");
    }

    let updates = { ...otherUpdates };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (email) updates.email = email.trim();

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedUser) {
      res.status(400);
      throw new Error("User not found");
    }

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({ message: "Update successful", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during the update.", error: error.message });
  }
});

//*Delete the user, access public
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delete successful", user: deletedUser });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

module.exports = { registerUser, getUser, updateUser, deleteUser };
