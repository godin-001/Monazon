import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import path from "path"
import { mkdirSync, existsSync } from "fs"

export const paymentLinks = sqliteTable("payment_links", {
  id: text("id").primaryKey(),
  sellerAddress: text("seller_address").notNull(),
  amountRaw: text("amount_raw").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

export type PaymentLink = typeof paymentLinks.$inferSelect
export type NewPaymentLink = typeof paymentLinks.$inferInsert

const dataDir = path.join(process.cwd(), "data")
const dbPath = path.join(dataDir, "payments.db")

function getDb() {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
  const sqlite = new Database(dbPath)
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS payment_links (
      id TEXT PRIMARY KEY,
      seller_address TEXT NOT NULL,
      amount_raw TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `)
  return drizzle(sqlite)
}

let _db: ReturnType<typeof getDb> | null = null

export function getDatabase() {
  if (!_db) _db = getDb()
  return _db
}
