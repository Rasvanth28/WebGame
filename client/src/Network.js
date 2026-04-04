import { io } from 'socket.io-client';

// 1. Connect to the local Node.js server we built
export const socket = io('http://localhost:3000');

// 2. Create a variable to hold the latest truth from the server
export let serverState = { players: {} };

// 3. Connection Events
socket.on('connect', () => {
  console.log('🔌 Connected to server! My ID is:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});

// 4. The Data Receiver
// Every time the server pulses 'stateUpdate' (30 times a second), update our local variable
socket.on('stateUpdate', (newState) => {
  serverState = newState;
});