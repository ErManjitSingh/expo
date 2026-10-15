import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import { seedDatabase } from './scripts/seedData';
import { Package } from './models';

async function start() {
  await connectDB();

  if (process.env.USE_MEMORY_DB === 'true' || env.mongoUri === 'memory') {
    const count = await Package.countDocuments();
    if (count === 0) {
      await seedDatabase(false);
    }
  }

  app.listen(env.port, () => {
    console.log(`ExploreMyBharat API listening on http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
