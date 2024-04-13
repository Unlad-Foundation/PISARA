const { constants } = require('../config/constantsConfig');
const errorHandler = (err, res) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.STATUS.VALIDATION_ERROR.CODE:
      res.json({
        title: constants.STATUS.VALIDATION_ERROR.TITLE,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.STATUS.NOT_FOUND.CODE:
      res.json({
        title: constants.STATUS.NOT_FOUND.TITLE,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.STATUS.UNAUTHORIZED.CODE:
      res.json({
        title: constants.STATUS.UNAUTHORIZED.TITLE,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.STATUS.FORBIDDEN.CODE:
      res.json({
        title: constants.STATUS.FORBIDDEN.TITLE,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.STATUS.SERVER_ERROR.CODE:
      res.json({
        title: constants.STATUS.SERVER_ERROR.TITLE,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.status(500).json({
        message: constants.ERROR.UNEXPECTED,
        error: err.message,
      });
      break;
  }
};

module.exports = errorHandler;
