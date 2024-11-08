import { Redis } from 'ioredis';

const redis = new Redis("redis://localhost:6379");

async function seedData() {
  await redis.set('participants', JSON.stringify({
    1: { "name": "Adam", "threshold": 4 },
    2: { "name": "Bosco", "threshold": 4 },
    3: { "name": "Catherine", "threshold": 5 }
  }));

  await redis.set('participantAvailability', JSON.stringify({
    // ... (use the data from the requirements)
  }));

  await redis.set('schedules', JSON.stringify({
    // ... (use the data from the requirements)
  }));

  console.log('Data seeded successfully');
  process.exit(0);
}

seedData().catch(console.error);