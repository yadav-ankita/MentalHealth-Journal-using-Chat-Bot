const express = require('express');
const router = express.Router();
const { addHealthGoal , getHealthGoal } = require('../controller/health');

router.route('/').get(getHealthGoal).post(addHealthGoal);
module.exports = router;
          