const router = require('express').Router();

const taskRoutes = require('./domain/task/routes');

router.use('/api/v1/tasks', taskRoutes);

module.exports = router;