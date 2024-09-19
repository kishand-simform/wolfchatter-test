const ChatroomService = require('../services/chatroom.service')

const ChatroomController = {
  create: async (req, res) => {
    const { latitude, longitude } = req.body
    const chatroom = await ChatroomService.createChatroom(latitude, longitude)
    res.json(chatroom)
  },
  list: async (req, res) => {
    const chatrooms = await ChatroomService.getAllChatrooms()
    res.json(chatrooms)
  },
  findById: async (req, res) => {
    const { id } = req.params
    const chatroom = await ChatroomService.getChatroomById(id)
    res.json(chatroom)
  }
};

module.exports = ChatroomController
