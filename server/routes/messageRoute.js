const express = require('express');
const router = express.Router();
const Message = require('../model/message-model')
const conversation = require('../model/conversation-model');
const { sendMessage, getMessage } = require('../controller/messageController');
const protectedRoute = require('../middleware/protectedRoute')

router.post('/send/:id', protectedRoute , sendMessage)
router.get('/get/:id', protectedRoute , getMessage)

module.exports = router