const tokenValidation = require('./validate-token-handler');
const { API_ENDPOINTS } = require('../config/endpoints-config');

const excludeFromTokenValidation = [
  {
    path: API_ENDPOINTS.USER.REGISTER.GET,
    method: 'GET',
  },
  {
    path: API_ENDPOINTS.USER.REGISTER.POST,
    method: 'POST',
  },
  {
    path: API_ENDPOINTS.USER.LOGIN.POST,
    method: 'POST',
  },
];

const conditionalTokenValidation = (req, res, next) => {
  const isExcluded = excludeFromTokenValidation.some(
    (endpoint) => endpoint.path === req.path && endpoint.method === req.method
  );

  if (isExcluded) {
    return next();
  }

  return tokenValidation(req, res, next);
};

module.exports = conditionalTokenValidation;
