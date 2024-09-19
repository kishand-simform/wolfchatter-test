const express = require('express')
const http = require('http')
const cors = require('cors')

const socket = require('./utils/socket.manager')
const pool = require('./config/database.config')

const app = express()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)
socket.init(server)

const chatroomRoutes = require('./routes/chatroom.routes')
const messageRoutes = require('./routes/message.routes')

app.use('/api/chatrooms', chatroomRoutes)
app.use('/api/messages', messageRoutes)

app.get('/', (req, res) => {
    res.send('Server is working fine for wolfchatter.')
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

