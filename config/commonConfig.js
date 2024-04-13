const { contants, constants } = require('./constantsConfig');

function trimAll(obj) {
  const trimmedObj = {};
  for (const key in obj) {
    trimmedObj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
  }
  return trimmedObj;
}

const MSG = {
  WELCOME: `You're successfully connected to ${constants.APP.NAME}.`,
};

module.exports = { trimAll, MSG };
