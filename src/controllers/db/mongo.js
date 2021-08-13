import { MongoClient } from 'mongodb';

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASS,
    MONGO_DB,
} = process.env;

const client = new MongoClient(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/?retryWrites=true&writeConcern=majority`);

await client.connect();

export default client.db(MONGO_DB);
