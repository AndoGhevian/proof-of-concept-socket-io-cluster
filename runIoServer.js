if (!process.env.PORT) {
  console.error('PORT environment variable is required');
  process.exit(1);
}

const http = require('http');
const { Server } = require('socket.io');

function runIoServer(adapter) {
  const server = http.createServer();

  const io = new Server(server);

  io.adapter(adapter);

  io.on('connection', (socket) => {
    console.log(`
Client connected: ${socket.id}
server port: ${process.env.PORT}`);

    socket.on('message', (data) => {
      socket.broadcast.emit('broadcastedMessage', data);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

module.exports = runIoServer;