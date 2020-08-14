const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/api/get-temp/:city', controller.getTemp);

module.exports = router;