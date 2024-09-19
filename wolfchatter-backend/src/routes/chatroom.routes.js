const express = require('express')
const ChatroomController = require('../controllers/chatroom.controller')
const router = express.Router()

router.post('/', ChatroomController.create)
router.get('/', ChatroomController.list)
router.get('/:id', ChatroomController.findById)

module.exports = router