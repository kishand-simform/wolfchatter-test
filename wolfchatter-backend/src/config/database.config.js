const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

async function createTables() {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS chatrooms (
        chatroom_id SERIAL PRIMARY KEY,
        latitude DECIMAL(9,6),
        longitude DECIMAL(9,6),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
        message_id SERIAL PRIMARY KEY,
        chatroom_id INT REFERENCES chatrooms(chatroom_id),
        username VARCHAR(50),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);
}

createTables();

module.exports = pool;
