const router = require('express').Router()
const wrap = require('../../support/wrapErrorHandler');

const sessionController = require('./sessionController');

router.route('/')
  .post(wrap(sessionController.create));

module.exports = router;