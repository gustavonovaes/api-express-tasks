require('dotenv').config();

const app = require('./src/app');

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening...');
});

const exitHandler = () => {
  if (app) {
    return app.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
};

const unexpectedErrorHandler = () => {
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (app) {
    app.close();
  }
});
