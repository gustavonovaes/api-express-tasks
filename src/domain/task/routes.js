
const router = require('express').Router();
const wrap = require('../../support/wrapErrorHandler');

const taskController = require('./taskController');

router.route('/')
  .get(wrap(taskController.index))
  .post(wrap(taskController.create));

router.route('/:id')
  .get(wrap(taskController.find))
  .put(wrap(taskController.update))
  .delete(wrap(taskController.delete));

module.exports = router;