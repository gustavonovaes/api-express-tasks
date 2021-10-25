const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { mongooseServiceFactory } = require('./services/mongoose');

const routes = require('./routes');
const schemas = require('./schemas');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(mongooseServiceFactory({
  uri: process.env.MONGODB_URL,
  timeout: process.env.MONGODB_TIMEOUT,
  schemas
}));

app.use(routes);
app.use(errorHandler);
app.use(notFound);

module.exports = app;