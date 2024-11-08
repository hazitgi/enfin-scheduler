import { seedRedisData } from "@/lib/redis-seed";
import { PropsWithChildren } from "react";

type WrapperProp = PropsWithChildren;
export default function Wrapper({ children }: WrapperProp) {
  // Only run on the server during app initialization

  seedRedisData()
    .catch((error)=>console.error("Error seeding Redis data:", error) )
    .then((result) => {
      console.log("Redis data seeded:", result);
    });

  return <>{children}</>;
}
