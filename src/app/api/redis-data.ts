// // pages/api/seed-redis.ts
// import { Redis } from "ioredis";
// import { NextApiRequest, NextApiResponse } from "next";

// const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Check if data is already seeded
//     const existingData = await redis.get("participants");
//     if (existingData) {
//       return res.status(200).json({ message: "Redis data already seeded" });
//     }

//     // Seed data if not present
//     await redis.set(
//       "participants",
//       JSON.stringify({
//         1: { name: "Adam", threshold: 4 },
//         2: { name: "Bosco", threshold: 4 },
//         3: { name: "Catherine", threshold: 5 },
//       })
//     );

//     await redis.set(
//       "participantAvailability",
//       JSON.stringify({
//         1: {
//           Monday: [
//             { start: "09:00", end: "11:00" },
//             { start: "14:00", end: "16:30" },
//           ],
//           Tuesday: [{ start: "09:00", end: "18:00" }],
//         },
//       })
//     );

//     await redis.set(
//       "schedules",
//       JSON.stringify({
//         1: {
//           "28/10/2024": [
//             { start: "09:30", end: "10:30" },
//             { start: "15:00", end: "16:30" },
//           ],
//         },
//       })
//     );

//     res.status(200).json({ message: "Data seeded successfully" });
//   } catch (error) {
//     console.error("Error seeding data:", error);
//     res.status(500).json({ message: "Failed to seed data" });
//   }
// }
