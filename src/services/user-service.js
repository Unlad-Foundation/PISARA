const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const { trimAll } = require("../config/common-config")
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const saltFactor = 10;

//*Get the user by id
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
    const trimmedBody = trimAll(req.body);
    try {
        const { firstname, lastname, role, email, password } = trimmedBody;
        if (!firstname || !lastname || !role || !email || !password) {
            throw new Error("All fields are mandatory!");
        }

        if (!validator.isEmail(email)) {
            res.status(400);
            throw new Error("Invalid email format");
        }

        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            throw new Error("User already registered!");
        }

        const hashedPassword = await bcrypt.hash(password, saltFactor);

        let user = await User.create({
            firstname,
            lastname,
            role,
            email,
            password: hashedPassword,
        });
        user = await User.findById(user.id).select('-password');
        res.status(201).json(user);
    } catch (error) {
        res.status(400);
        throw error;
    }
});

//*Update the user, access public
const updateUser = asyncHandler(async (req, res) => {
    const trimmedBody = trimAll(req.body);
    try {
        const { email, password, ...otherUpdates } = trimmedBody;

        if (email && !validator.isEmail(email)) {
            res.status(400);
            throw new Error("Invalid email format");
        }

        let updates = { ...otherUpdates };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        if (email) updates.email = email;

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

//*Get users. For debugging only
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})

//*Login the user, access public
const loginUser = asyncHandler(async (req, res) => {
    const trimmedBody = trimAll(req.body);
    try {
        const { email, password } = trimmedBody;
        if (!email || !password) {
            throw new Error("Both email and password are required.");
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid credentials");
        }

        const accessToken = jwt.sign(
            { user: { id: user.id, email: user.email, role: user.role } },
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

module.exports = { registerUser, getUser, updateUser, deleteUser, getUsers, loginUser, currentUser };
