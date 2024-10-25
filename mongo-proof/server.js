if (!process.env.PORT) {
   console.error('PORT environment variable is required');
   process.exit(1);
}

const { MongoClient } = require("mongodb");
const { createAdapter } = require('@socket.io/mongo-adapter');
const runIoServer = require('../runIoServer');

const DB = "mongo-proof-db";
const COLLECTION = "socket.io-adapter-events";

const mongoClient = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0");

mongoClient.connect()
   .then(async (res) => {
      console.log(`Successfully Connected to mongodb, (port ${process.env.PORT})`);
      await mongoClient.db(DB).createCollection(COLLECTION, {
        capped: true,
        size: 1e6
      });
      const mongoCollection = mongoClient.db(DB).collection(COLLECTION);
      
      await mongoCollection.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: 3600, background: true }
      );
      
      runIoServer(createAdapter(mongoCollection, {
         addCreatedAtField: true,
      }))
   })
   .catch((err) => {
      console.error(`Error connecting to mongodb (port ${process.env.PORT})`, err);
      process.exit(1);
   });
