// socket.js
// const { Server } = require('socket.io');
import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://pollify-1.onrender.com",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

export const emitPollResults = (pollResults) => {
  if (io) {
    io.emit('pollResults', pollResults);
  }
};

// module.exports = { initSocket, emitPollResults };
