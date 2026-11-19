import { readFile } from "node:fs/promises";

import db from "#db/client";

/** Applies db/schema.sql to the connected database. */
export async function applySchema() {
  const sql = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
  await db.query(sql);
}
