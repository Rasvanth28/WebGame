const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// 1. Setup Express and HTTP Server
const app = express();
app.use(cors());
const server = http.createServer(app);

// 2. Setup Socket.io and allow your Vite frontend to connect
const io = new Server(server, {
  cors: {
    origin: "*", // Allows any frontend to connect (useful for local dev)
    methods: ["GET", "POST"]
  }
});

// 3. The Master State
// This object holds the coordinates and rotations of every player in the game
const gameState = {
  players: {}
};

// 4. Handle Connections & Client Updates
io.on('connection', (socket) => {
  console.log(`[+] Player joined the solar system: ${socket.id}`);

  // When a player joins, give them a blank entry in the dictionary
  gameState.players[socket.id] = { x: 0, z: 0, rotation: 0 };

  // Listen for the physics calculations coming from the client's browser
  socket.on('playerMoved', (data) => {
    // Update the server's record of this player's position
    if (gameState.players[socket.id]) {
      gameState.players[socket.id].x = data.x;
      gameState.players[socket.id].z = data.z;
      gameState.players[socket.id].rotation = data.rotation;
    }
  });

  // Cleanup when a player closes their tab
  socket.on('disconnect', () => {
    console.log(`[-] Player left: ${socket.id}`);
    delete gameState.players[socket.id];
  });
});

// 5. The Heartbeat (Broadcast Loop)
// Send the updated master state to every connected player 30 times per second
setInterval(() => {
  io.emit('stateUpdate', gameState);
}, 1000 / 30);

// 6. Start the Engine
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Multiplayer Server is running on port ${PORT}`);
});