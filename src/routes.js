const router = require('express').Router();

const jwtMiddleware = require('./middlewares/jwtMiddleware');

const sessionRoutes = require('./domain/session/routes');
const userRoutes = require('./domain/user/routes');
const taskRoutes = require('./domain/task/routes');

router.use('/api/v1/session', sessionRoutes);
router.use('/api/v1/user', userRoutes);
router.use('/api/v1/tasks', jwtMiddleware, taskRoutes);

module.exports = router;
