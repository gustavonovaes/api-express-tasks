const ApiError = require("../support/apiError");

const errorHandler = (error, req, res, next) => {
  console.error(error);
  
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message
    });
  }

  return res.status(500).json({
    message: error.message
  });
}

module.exports = errorHandler;