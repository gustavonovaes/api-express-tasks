const ApiError = require("../support/apiError");

const jwtHeader = 'x-access-token';
const key = '$user';

const jwtMiddleware = (req, _, next) => {
  const token = req.headers[jwtHeader];
  if (!token) {
    return next(new ApiError(`No token provided at header '${jwtHeader}'`, 401));
  }

  req.$jwt.verify(token)
    .then((user) => {
      req[key] = user;
      next();
    }).catch(next);
};

module.exports = jwtMiddleware;
