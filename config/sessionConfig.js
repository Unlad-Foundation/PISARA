const session = require('express-session');
const { constants } = require('./constantsConfig');

const sessionConfig = {
  secret: process.env.SESSION_SECRET || constants.JWTCONFIG.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
};

module.exports = session(sessionConfig);
