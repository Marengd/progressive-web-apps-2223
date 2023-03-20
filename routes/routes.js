const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');

router.get('/', controller.index);

router.get('/generator', controller.generator);

module.exports = router;