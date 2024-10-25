if (!process.env.PORT) {
   console.error('PORT environment variable is required');
   process.exit(1);
}

const { Cluster } = require('ioredis');
const { createAdapter } = require('@socket.io/redis-adapter');
const runIoServer = require('../../runIoServer');
const retryStrategy = require('../retryStrategy')

const pubClient = new Cluster([
   {
      host: 'localhost',
      port: 6379,
   },
   {
      host: 'localhost',
      port: 6380,
   },
   {
      host: 'localhost',
      port: 6381,
   }
], {
   clusterRetryStrategy: retryStrategy,
})
const subClient = pubClient.duplicate();

pubClient.on("ready", () => console.log(`Publisher Redis Cluster is ready (port ${process.env.PORT})`));
pubClient.on("reconnecting", (delay) => console.log(`Reconnecting to Redis (port ${process.env.PORT})in ${delay}ms`));

pubClient.on("error", (err) => {
   console.log(`redis pub client error (port ${process.env.PORT}):`, err)
   process.exit(1)
})

runIoServer(createAdapter(pubClient, subClient, {
   key: "socket.io" // this is optional property
}))