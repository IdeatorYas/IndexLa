import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const socialPlatformEnum = pgEnum("social_platform", ["x", "linkedin"]);

export const investors = pgTable(
  "investors",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("investors_email_unique").on(table.email)],
);

export const creators = pgTable(
  "creators",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    socialPlatform: socialPlatformEnum("social_platform").notNull(),
    socialHandle: text("social_handle").notNull(),
    socialVerified: boolean("social_verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("creators_email_unique").on(table.email)],
);
