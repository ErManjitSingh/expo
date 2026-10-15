import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB(): Promise<void> {
  let uri = env.mongoUri;

  if (process.env.USE_MEMORY_DB === 'true' || uri === 'memory') {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const memory = await MongoMemoryServer.create();
    uri = memory.getUri('exploremybharat');
    console.log('Using in-memory MongoDB');
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
