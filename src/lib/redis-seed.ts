// lib/redis-seed.ts
import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function seedRedisData() {
  const existingData = await redis.get("participants");
  console.log("🚀 ~ seedRedisData ~ existingData:", existingData);
  const participantAvailability = await redis.get("participantAvailability");
  console.log(
    "🚀 ~ seedRedisData ~ participantAvailability:",
    participantAvailability
  );
  const schedules = await redis.get("schedules");
  console.log("🚀 ~ seedRedisData ~ schedules:", schedules);
  if (existingData) return; // Data already seeded

  // Seed the data
  await redis.set(
    "participants",
    JSON.stringify({
      1: { name: "Adam", threshold: 4 },
      2: { name: "Bosco", threshold: 4 },
      3: { name: "Catherine", threshold: 5 },
      4: { name: "Mohamed Haseeb", threshold: 5 },
    })
  );

  await redis.set(
    "participantAvailability",
    JSON.stringify({
      1: {
        Monday: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:30" },
        ],
        Tuesday: [{ start: "09:00", end: "18:00" }],
      },
    })
  );

  await redis.set(
    "schedules",
    JSON.stringify({
      1: {
        "28/10/2024": [
          { start: "09:30", end: "10:30" },
          { start: "15:00", end: "16:30" },
        ],
      },
    })
  );
}
