import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let dbInstance: Db | undefined;

export function getDb(): Db {
  if (dbInstance) {
    return dbInstance;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(databaseUrl);
  dbInstance = drizzle(sql, { schema });
  return dbInstance;
}

export * from "./schema";
