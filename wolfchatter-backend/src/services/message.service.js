const Message = require('../models/message.model')

const MessageService = {
  createMessage: async (chatroom_id, user_id, content) => {
    return await Message.create(chatroom_id, user_id, content)
  },
  getMessagesByChatroomId: async (chatroom_id) => {
    return await Message.findByChatroomId(chatroom_id)
  },
};

module.exports = MessageService