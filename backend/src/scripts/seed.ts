import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { seedDatabase } from './seedData';

async function run() {
  await connectDB();
  await seedDatabase(true);
  await mongoose.disconnect();
  console.log('Done.');
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
