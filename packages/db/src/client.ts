import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"

import * as schema from "./schema"

const url = process.env.DATABASE_URL
if (!url) {
  throw new Error("DATABASE_URL is not set")
}

const sqlite = new Database(url.replace(/^file:/, ""))
export const db = drizzle(sqlite, { schema })
