const pool = require('../config/database.config')

const Message = {
  create: async (chatroom_id, username, message) => {
    const result = await pool.query(
      'INSERT INTO messages (chatroom_id, username, message) VALUES ($1, $2, $3) RETURNING *',
      [chatroom_id, username, message]
    )
    return result.rows[0]
  },
  findByChatroomId: async (chatroom_id) => {
    const result = await pool.query(
      'SELECT * FROM messages WHERE chatroom_id = $1',
      [chatroom_id]
    )
    return result.rows
  },
};

module.exports = Message