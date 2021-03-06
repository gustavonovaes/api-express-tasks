const mongoose = require('mongoose');

// Returns the document with the update applied
mongoose.set('returnOriginal', false);

function defineSchemaModels(conn, schemas) {
  return Object.keys(schemas).reduce((models, name) => {
    // eslint-disable-next-line no-param-reassign
    models[name] = conn.model(name, schemas[name]);
    return models;
  }, {});
}

const mongooseServiceFactory = ({ uri, timeout, schemas }) => (req, _, next) => {
  let $cache = null;

  Object.defineProperty(req, '$models', {
    get() {
      if ($cache) {
        return $cache;
      }

      const conn = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: timeout,
        socketTimeoutMS: timeout,
      });

      $cache = defineSchemaModels(conn, schemas);

      return $cache;
    },
  });

  next();
};

module.exports = {
  mongooseServiceFactory,
};
