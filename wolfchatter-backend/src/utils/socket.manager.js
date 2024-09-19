const { Server } = require('socket.io')
let io

module.exports = {
    init: (server) => {
        io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        })

        io.on('connection', (socket) => {
            console.log('New client connected')

            socket.on('marker_add', (data) => {
                console.log('New marker added');
                socket.broadcast.emit('marker_added', data);
            })

            socket.on('join_room', (chatroom_id) => {
                console.log('New user joined chatroom', chatroom_id)
                socket.join(`chatroom_${chatroom_id}`)
            })

            socket.on('leave_room', (chatroom_id) => {
                console.log('User leaft chatroom', chatroom_id)
                socket.leave(`chatroom_${chatroom_id}`)
            })

            socket.on('new_message', ({ chatroom_id, message }) => {
                console.log('New message created')
                io.to(`chatroom_${chatroom_id}`).emit('message_received', { chatroom_id, message })
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
        return io
    },

    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!')
        }
        return io
    }
}