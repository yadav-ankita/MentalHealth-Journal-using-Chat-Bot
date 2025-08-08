const express = require('express');
const router = express.Router();
const { GetPlaces } = require('../controller/findPlace');
router.route('/').get(GetPlaces);
module.exports = router;
                  