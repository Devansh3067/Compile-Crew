require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const aiRoutes = require('./src/routes/ai.routes.js');

const UserModel = require('./src/models/user.js');

const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5001",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// AI Routes
app.use('/ai', aiRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Frontend is not started yet!!!');
});

app.post('/', (req, res) => {
    // console.log(req.body)
    UserModel.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("Password is incorrect")
                }
            } else {
                res.json("User not found")
            }
        })
})



import('./src/Action.js').then(({ default: ACTIONS }) => {
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
        // console.log('A user connected:', socket.id);

        socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
            userSocketMap[socket.id] = userName;
            socket.join(roomId);
            const allClients = getAllConnectedClients(roomId);
            // console.log(allClients);
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

    const port = process.env.PORT || 5001;
    server.listen(port, () => console.log(`Server listening on port ${port} ❤️`));
});