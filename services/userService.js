const userRepository = require('../repository/userRepository');
const { constants } = require('../config/constantsConfig');
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
      return res.status(400).json({ message: constants.ERROR.USER.NOT_FOUND });
    }
    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function registerUser(req, res) {
  const trimmedBody = trimAll(req.body);
  try {
    const { email, password } = trimmedBody;
    if (!email || !password) {
      return res.status(400).json({ message: constants.ERROR.USER.REQUIRED_FIELDS });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: constants.ERROR.USER.INVALID_EMAIL });
    }

    const userAvailable = await userRepository.findByEmail(email);
    if (userAvailable) {
      return res.status(400).json({ message: constants.ERROR.USER.ALREADY_EXIST });
    }

    const hashedPassword = await bcrypt.hash(password, saltFactor);

    let user = await userRepository.createUser({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: constants.SUCCESS.USER.REGISTER, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  const trimmedBody = trimAll(req.body);
  try {
    const { email, password, ...otherUpdates } = trimmedBody;

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: constants.ERROR.USER.INVALID_EMAIL });
    }

    let updates = { ...otherUpdates };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (email) updates.email = email;

    const updatedUser = await userRepository.updateUser(req.user.id, updates);

    if (!updatedUser) {
      return res.status(400).json({ message: constants.ERROR.USER.NOT_FOUND });
    }

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({ message: constants.SUCCESS.USER.UPDATE, user: userWithoutPassword });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: constants.ERROR.USER.EMAIL_ALREADY_EXISTS });
    } else {
      return res
        .status(500)
        .json({ message: constants.ERROR.USER.UPDATE_FAILED, error: error.message });
    }
  }
}

async function deleteUser(req, res) {
  try {
    const user = await userRepository.getUser(req.params.id);
    if (!user) {
      return res.status(400).json({ message: constants.ERROR.USER.NOT_FOUND });
    }
    const deletedUser = await userRepository.deleteUser(req.params.id);
    res.status(200).json({ message: constants.SUCCESS.USER.DELETE, user: deletedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getUsers(req, res) {
  try {
    const users = await userRepository.getUsers();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  const trimmedBody = trimAll(req.body);
  try {
    const { email, password } = trimmedBody;
    if (!email || !password) {
      return res.status(400).json({ message: constants.ERROR.USER.REQUIRED_FIELDS });
    }

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: constants.ERROR.USER.INVALID_EMAIL });
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: constants.ERROR.USER.NO_ACCOUNT });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: constants.ERROR.USER.INVALID_CREDENTIALS });
    }

    const accessToken = jwt.sign(
      { user: { id: user.id, email: user.email, role: user.role } },
      process.env.ACCESS_TOKEN_SECRET || constants.JWTCONFIG.SECRET,
      { expiresIn: constants.JWTCONFIG.EXPIRESIN }
    );

    res.status(200).json({ message: constants.SUCCESS.USER.LOGIN, accessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function currentUser(req, res) {
  try {
    if (!req.user) {
      res.status(401);
      res.status(401).json({ message: constants.ERROR.USER.NOT_AUTHORIZED });
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
