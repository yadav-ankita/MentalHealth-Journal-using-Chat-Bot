const express = require('express');
const router = express.Router();
const { sendChat, submitSymptom,} = require('../controller/chat');

router.route('/chat').post(sendChat);
router.route('/symptom').post(submitSymptom);
module.exports = router;
