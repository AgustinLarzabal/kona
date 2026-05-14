import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { describe, expect, it } from "vitest"
import * as schema from "./schema/index.js"

describe("@kona/db schema", () => {
  it("exports all better-auth tables", () => {
    expect(schema.user).toBeDefined()
    expect(schema.session).toBeDefined()
    expect(schema.account).toBeDefined()
    expect(schema.verification).toBeDefined()
  })

  it("migration creates tables in a fresh database", () => {
    const migrationPath = resolve(__dirname, "../migrations/0000_nervous_tinkerer.sql")
    const sql = readFileSync(migrationPath, "utf-8")
    const statements = sql
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter(Boolean)

    const sqlite = new Database(":memory:")
    for (const stmt of statements) {
      sqlite.exec(stmt)
    }

    const tables = sqlite
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
      )
      .all() as Array<{ name: string }>
    const names = tables.map((t) => t.name)

    expect(names).toContain("user")
    expect(names).toContain("session")
    expect(names).toContain("account")
    expect(names).toContain("verification")
  })

  it("drizzle instance works with the schema against migrated db", () => {
    const migrationPath = resolve(__dirname, "../migrations/0000_nervous_tinkerer.sql")
    const sql = readFileSync(migrationPath, "utf-8")
    const statements = sql
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter(Boolean)

    const sqlite = new Database(":memory:")
    for (const stmt of statements) {
      sqlite.exec(stmt)
    }

    const db = drizzle(sqlite, { schema })
    const users = db.select().from(schema.user).all()
    expect(users).toEqual([])
  })
})
