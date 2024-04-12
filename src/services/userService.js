const userRepository = require('../repository/userRepository');
const { trimAll } = require('../config/commonConfig');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const saltFactor = 10;

const userService = {
  registerUser: registerUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUsers: getUsers,
  loginUser: loginUser,
  currentUser: currentUser,
};

module.exports = userService;

async function getUser(req, res) {
  try {
    const user = await userRepository.getUser(req.params.id);
    if (!user) {
      res.status(400).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400);
    throw error;
  }
}

async function registerUser(req, res) {
  const trimmedBody = trimAll(req.body);
  try {
    const { email, password } = trimmedBody;
    if (!email || !password) {
      res.status(400).json({ message: 'Both email and password are required.' });
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({ message: 'Invalid email format' });
    }

    const userAvailable = await userRepository.findByEmail(email);
    if (userAvailable) {
      res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltFactor);

    let user = await userRepository.createUser({
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400);
    throw error;
  }
}

async function updateUser(req, res) {
  const trimmedBody = trimAll(req.body);
  try {
    const { email, password, ...otherUpdates } = trimmedBody;

    if (email && !validator.isEmail(email)) {
      res.status(400).json({ message: 'Invalid email format' });
    }

    let updates = { ...otherUpdates };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (email) updates.email = email;

    const updatedUser = await userRepository.updateUser(req.user.id, updates);

    if (!updatedUser) {
      res.status(400).json({ message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({ message: 'Update successful', user: userWithoutPassword });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res
        .status(500)
        .json({ message: 'An error occurred during the update.', error: error.message });
    }
  }
}

async function deleteUser(req, res) {
  try {
    const user = await userRepository.getUser(req.params.id);
    if (!user) {
      res.status(400).json({ message: 'User not found' });
    }
    const deletedUser = await userRepository.deleteUser(req.params.id);
    res.status(200).json({ message: 'Delete successful', user: deletedUser });
  } catch (error) {
    res.status(400);
    throw error;
  }
}

async function getUsers(req, res) {
  const users = await userRepository.getUsers();
  res.status(200).json(users);
}

async function loginUser(req, res) {
  const trimmedBody = trimAll(req.body);
  try {
    const { email, password } = trimmedBody;
    if (!email || !password) {
      res.status(400).json({ message: 'Both email and password are required.' });
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: 'No account found with this email. Please register.' });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { user: { id: user.id, email: user.email, role: user.role } },
      process.env.ACCESS_TOKEN_SECRET || 'P!$@r@S3cr3t',
      { expiresIn: '1d' }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400);
    throw error;
  }
}

async function currentUser(req, res) {
  try {
    if (!req.user) {
      res.status(401);
      res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
}
