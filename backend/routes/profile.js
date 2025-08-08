const express = require('express');
const router = express.Router();
const { GetProfileInfo } = require('../controller/profile');
router.route('/').get(GetProfileInfo);
module.exports = router;
                  