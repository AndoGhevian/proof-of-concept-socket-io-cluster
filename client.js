if(!process.env.PORT) {
   console.error('PORT environment variable is required');
   process.exit(1);
}

const { io } = require('socket.io-client');

const socket = io(`http://localhost:${process.env.PORT}`);

let count = 0;
socket.on('connect', () => {
   console.log('MY NEW ID:', socket.id, "\n\n");
   console.log("Chat Open:")
   setInterval(() => {
      socket.emit('message', `Hello from client ${socket.id} ${count++} times.`);
   }, 3500)
});

socket.on('broadcastedMessage', (data) => {
   console.log(data);
});

socket.on('disconnect', () => {
   console.log('Disconnected from server');
});