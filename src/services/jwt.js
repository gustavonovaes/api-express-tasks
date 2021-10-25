const jwt = require('jsonwebtoken');

function buildJwtFactory({ secret, expireTime }) {
  return {
    verify: (token) => new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(decoded);
      });
    }),

    sign: (data) => jwt.sign(data, secret, {
      expiresIn: expireTime,
    }),
  };
}

const jwtServiceFactory = ({ secret, expireTime }) => (req, _, next) => {
  let $cache = null;

  Object.defineProperty(req, '$jwt', {
    get() {
      if ($cache) {
        return $cache;
      }

      $cache = buildJwtFactory({ secret, expireTime });

      return $cache;
    },
  });

  next();
};

module.exports = {
  jwtServiceFactory,
};
