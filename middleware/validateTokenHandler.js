const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { constants } = require('../config/constantsConfig');

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const tokenMatch = authHeader ? authHeader.match(constants.JWTCONFIG.BEARER_REGEX) : null;
  const token = tokenMatch ? tokenMatch[1] : null;

  if (token) {
    try {
      const decoded = await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || constants.JWTCONFIG.SECRET
      );
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'User is not authorized' });
    }
  } else {
    return res.status(401).json({ message: 'User is not authorized or token is missing' });
  }
});

module.exports = validateToken;
