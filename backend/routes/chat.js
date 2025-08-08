const express = require('express');
const router = express.Router();
const { sendChat, submitSymptom,getAllChat,getAllSymptom} = require('../controller/chat');

router.route('/chat').get(getAllChat).post(sendChat);
router.route('/symptom').get(getAllSymptom).post(submitSymptom);
module.exports = router;
          