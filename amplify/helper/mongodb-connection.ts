import { Db, MongoClient } from 'mongodb';

const mongodbConnection = (db: string): Db => {
  if (!process.env.DATABASE_SERVER) throw new Error('Invalid DB URL');

  const client = new MongoClient(process.env.DATABASE_SERVER);

  return client.db(db);
};

export default mongodbConnection;
