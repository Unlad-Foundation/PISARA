const tokenValidationHandler = require('./validateTokenHandler');
const { API_ENDPOINTS } = require('../config/endpointsConfig');

const excludeFromTokenValidation = [
  {
    path: API_ENDPOINTS.MAIN.DEFAULT,
    method: 'GET',
  },
  {
    path: API_ENDPOINTS.USER.GET,
    method: 'GET',
  },
  {
    path: API_ENDPOINTS.USER.POST,
    method: 'POST',
  },
  {
    path: API_ENDPOINTS.USER.LOGIN,
    method: 'POST',
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
