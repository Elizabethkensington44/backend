import db from "#db/client";
import { applySchema } from "./schema.js";
import { seed } from "./seed.js";

await db.connect();

try {
  await applySchema();
  await seed();
  console.log("🌱 Database reset and seeded.");
} finally {
  await db.end();
}
