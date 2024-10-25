if (!process.env.PORT) {
   console.error('PORT environment variable is required');
   process.exit(1);
}

const { Redis } = require('ioredis');
const { createAdapter } = require('@socket.io/redis-adapter');
const runIoServer = require('../../runIoServer');
const retryStrategy = require('../retryStrategy')

const pubClient = new Redis({
   host: 'localhost',
   port: 6379,
   retryStrategy,
})
const subClient = pubClient.duplicate();

runIoServer(createAdapter(pubClient, subClient, {
   key: "socket.io" // this is optional property
}))