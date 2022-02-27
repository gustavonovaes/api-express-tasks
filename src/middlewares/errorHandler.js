const { TokenExpiredError } = require('jsonwebtoken');

const ApiError = require('../support/apiError');

const errorHandler = (error, req, res, _next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof TokenExpiredError) {
    return res.status(401).json({
      message: 'Token expired',
    });
  }

  return res.status(500).json({
    message: error.message,
  });
};

module.exports = errorHandler;
