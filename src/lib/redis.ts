import { Redis } from "ioredis";
import { AvailabilityData } from "./types";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function getAvailabilityData(): Promise<AvailabilityData> {
  const [participants, participantAvailability, schedules] = await Promise.all([
    redis.get("participants"),
    redis.get("participantAvailability"),
    redis.get("schedules"),
  ]);

  return {
    participants: JSON.parse(participants || "{}"),
    participantAvailability: JSON.parse(participantAvailability || "{}"),
    schedules: JSON.parse(schedules || "{}"),
  };
}
