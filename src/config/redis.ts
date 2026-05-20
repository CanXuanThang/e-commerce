import { createClient } from "redis";
import "dotenv/config";

const clientRedis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

clientRedis.on("error", (error) =>
  console.error("Redis Client Error: ", error),
);
clientRedis.on("connect", () => console.log("Redis connected !"));

clientRedis.connect();

export default clientRedis;
