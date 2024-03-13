const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users/user-model");

//*Get users. For debugging only
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
})

//*Login the user, access public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password) {
      throw new Error("Both email and password are required.");
    }

    const user = await User.findOne({ email: email.trim() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { user: { id: user.id, email: user.email } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

//*Check the current user, access private
const currentUser = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized access. No user found.");
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
});

module.exports = { loginUser, currentUser, getUsers };
