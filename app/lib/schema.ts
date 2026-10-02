import { pgTable, text, uuid, date, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

// --- Better Auth tables (managed by the auth library; do not hand-edit rows) ---
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
  phoneNumber: text("phone_number").unique(),
  phoneNumberVerified: boolean("phone_number_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// --- GroomingHer tables ---
// Teen profile (one row per app user; parent access goes via shares only)
export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  ageBand: text("age_band").notNull(), // 12-14 | 15-17 | 18-19
  menarcheStatus: text("menarche_status").notNull(), // yes | no
  language: text("language").notNull().default("en"),
  pinHash: text("pin_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cycles = pgTable("cycles", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  flow: text("flow").notNull().default("medium"), // light | medium | heavy
});

export const symptoms = pgTable("symptoms", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  cycleId: uuid("cycle_id").references(() => cycles.id, { onDelete: "set null" }),
  date: date("date").notNull(),
  pain: integer("pain").notNull().default(0), // 0-5
  discharge: text("discharge"),
  acne: boolean("acne").default(false),
  bloating: boolean("bloating").default(false),
  mood: text("mood"),
  schoolMissed: boolean("school_missed").default(false),
});

export const assessments = pgTable("assessments", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  inputsSnapshot: jsonb("inputs_snapshot").notNull(),
  outcome: text("outcome").notNull(), // monitor | adult | professional | urgent
  explanation: text("explanation").notNull(),
  redFlags: jsonb("red_flags").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const shares = pgTable("shares", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  assessmentId: uuid("assessment_id").references(() => assessments.id, { onDelete: "set null" }),
  summaryText: text("summary_text").notNull(),
  recipientType: text("recipient_type").notNull().default("parent"),
  sharedAt: timestamp("shared_at").defaultNow().notNull(),
});

export const learnArticles = pgTable("learn_articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  ageBand: text("age_band").notNull().default("all"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  locale: text("locale").notNull().default("en"),
});
