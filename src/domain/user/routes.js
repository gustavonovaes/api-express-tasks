const router = require('express').Router();
const wrap = require('../../support/wrapErrorHandler');

const userController = require('./userController');

router.route('/')
  .post(wrap(userController.create));

module.exports = router;
