const express = require('express')
const MessageController = require('../controllers/message.controller')
const router = express.Router()

router.post('/', MessageController.create)
router.get('/chatroom/:id', MessageController.listByChatroom)

module.exports = router
