require('dotenv').config();

const server = require('./src/server');

server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening...');
});

const exitHandler = () => {
  if (server) {
    return server.close(() => {
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
  if (server) {
    server.close();
  }
});
