import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema",
  dialect: "sqlite",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:../../kona.db",
  },
});
