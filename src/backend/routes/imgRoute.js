const express = require('express');
const imgController = require('../controllers/imgController');

const router = express.Router();

router.get('/file', imgController.get);

module.exports = router;
