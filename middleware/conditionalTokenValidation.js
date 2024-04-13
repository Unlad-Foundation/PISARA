const tokenValidationHandler = require('./validateTokenHandler');
const { API_ENDPOINTS } = require('../config/endpointsConfig');
const { constants } = require('../config/constantsConfig');

const excludeFromTokenValidation = [
  {
    path: API_ENDPOINTS.MAIN.DEFAULT,
    method: constants.METHOD.GET,
  },
  {
    path: API_ENDPOINTS.USER.GET,
    method: constants.METHOD.GET,
  },
  {
    path: API_ENDPOINTS.USER.POST,
    method: constants.METHOD.POST,
  },
  {
    path: API_ENDPOINTS.USER.LOGIN,
    method: constants.METHOD.POST,
  },
];

const conditionalTokenValidation = (req, res, next) => {
  const isExcluded = excludeFromTokenValidation.some(
    (exclusion) => req.path.endsWith(exclusion.path) && req.method === exclusion.method
  );
  if (isExcluded) {
    return next();
  }
  tokenValidationHandler(req, res, next);
};

module.exports = conditionalTokenValidation;
