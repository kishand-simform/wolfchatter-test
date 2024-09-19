const Chatroom = require('../models/chatroom.model')

const ChatroomService = {
  createChatroom: async (created_by, latitude, longitude) => {
    return await Chatroom.create(created_by, latitude, longitude)
  },
  getAllChatrooms: async () => {
    return await Chatroom.findAll()
  },
  getChatroomById: async (id) => {
    return await Chatroom.findById(id)
  }
};

module.exports = ChatroomService