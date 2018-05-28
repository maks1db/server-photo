const express = require('express');

const router = express.Router();

router.use('/img', require('./imgRoute'));

module.exports = router;
