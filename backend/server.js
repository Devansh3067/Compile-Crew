const express = require('express'); // importing express module
const http = require('http'); // importing http module
const { Server } = require('socket.io'); // importing Server class from socket.io module
const cors = require('cors');

// const ACTIONS = require('../frontend/src/Action.js'); //!Error when .js is removed...

const app = express(); // creates object of express
app.use(cors()); // Enable CORS

const server = http.createServer(app); // create http server using express application ie app
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow your Vite app to connect
        methods: ["GET", "POST"],
        credentials: true
    }
}); // creates object of Server class imported from socket.io
import('../frontend/src/Action.js').then(({ default: ACTIONS }) => {
    const userSocketMap = {};

    const getAllConnectedClients = (roomId) => {
        return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
            return {
                socketId,
                userName: userSocketMap[socketId],
            };
        });
    };

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
            userSocketMap[socket.id] = userName;
            socket.join(roomId);
            const allClients = getAllConnectedClients(roomId);
            console.log(allClients);
            allClients.forEach(({ socketId }) => {
                io.to(socketId).emit(ACTIONS.JOINED, {
                    allClients,
                    userName,
                    socketId: socket.id,
                });
            });
        });

        socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
            socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
        });

        socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
            io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
        });

        socket.on('disconnecting', () => {
            const rooms = [...socket.rooms];
            rooms.forEach((roomId) => {
                socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    userName: userSocketMap[socket.id],
                });
            });
            delete userSocketMap[socket.id];
            socket.leave();
        });
    });

    const port = process.env.PORT || 5000;
    server.listen(port, () => console.log(`server listening on port ${port} ❤️`));
});
