const MessageService = require('../services/message.service')
const io = require('../utils/socket.manager').getIO();

const MessageController = {
  create: async (req, res) => {
    const { chatroom_id, username, message } = req.body;
    const new_message = await MessageService.createMessage(chatroom_id, username, message);
    // io.to(`chatroom_${chatroom_id}`).emit('new_message', "new_message")
    res.json(new_message);
  },
  listByChatroom: async (req, res) => {
    const { id } = req.params;
    const messages = await MessageService.getMessagesByChatroomId(id);
    res.json(messages);
  },
};

module.exports = MessageController;
