"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "server": "node server/index.js",
  "dev:all": "concurrently \"npm run dev\" \"npm run server\""
},
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  const roomId = socket.handshake.query.roomId;
  socket.join(roomId);

  socket.on('code-change', (code) => {
    socket.to(roomId).emit('code-change', code);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));