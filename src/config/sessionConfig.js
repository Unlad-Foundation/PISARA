const session = require('express-session');

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'P!$@r@S3cr3t',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
};

module.exports = session(sessionConfig);
