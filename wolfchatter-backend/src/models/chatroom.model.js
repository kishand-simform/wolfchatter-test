const pool = require('../config/database.config')

const Chatroom = {
  create: async (latitude, longitude) => {
    const result = await pool.query(
      'INSERT INTO chatrooms (latitude, longitude) VALUES ($1, $2) RETURNING *',
      [latitude, longitude]
    )
    return result.rows[0]
  },
  findAll: async () => {
    const result = await pool.query('SELECT * FROM chatrooms')
    return result.rows
  },
  findById: async (id) => {
    const result = await pool.query('SELECT * FROM chatrooms WHERE chatroom_id = $1',
      [id]
    )
    return result.rows[0]
  }
};

module.exports = Chatroom
