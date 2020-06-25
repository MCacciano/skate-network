const express = require('express');

const { example } = require('../controllers/example');

const router = express.Router();

router.route('/').get(example);

module.exports = router;
