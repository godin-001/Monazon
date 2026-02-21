"use server"

import { getDatabase, paymentLinks } from "@/lib/db"
import { eq, desc } from "drizzle-orm"
import { nanoid } from "nanoid"
import { z } from "zod"

const createLinkSchema = z.object({
  sellerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  amount: z.string().min(1).refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, "Monto debe ser mayor a 0"),
})

export async function createPaymentLink({
  sellerAddress,
  amount,
}: {
  sellerAddress: string
  amount: string
}) {
  const parsed = createLinkSchema.safeParse({ sellerAddress, amount })
  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().formErrors[0] ?? "Datos inválidos" }
  }

  const amountNum = Number(parsed.data.amount)
  const amountRaw = String(BigInt(Math.round(amountNum * 1e6)))

  const id = nanoid(10)
  const db = getDatabase()
  await db.insert(paymentLinks).values({
    id,
    sellerAddress: parsed.data.sellerAddress,
    amountRaw,
    createdAt: new Date(),
  })

  return { ok: true, id, amount: amountNum }
}

export async function getPaymentLinkById(id: string) {
  const db = getDatabase()
  const rows = await db.select().from(paymentLinks).where(eq(paymentLinks.id, id)).limit(1)
  const row = rows[0]
  if (!row) return null
  return {
    id: row.id,
    sellerAddress: row.sellerAddress,
    amountRaw: row.amountRaw,
    amount: Number(row.amountRaw) / 1e6,
    createdAt: row.createdAt,
  }
}

export async function getLinksBySeller(sellerAddress: string) {
  const db = getDatabase()
  const rows = await db
    .select()
    .from(paymentLinks)
    .where(eq(paymentLinks.sellerAddress, sellerAddress))
    .orderBy(desc(paymentLinks.createdAt))

  return rows.map((row) => ({
    id: row.id,
    sellerAddress: row.sellerAddress,
    amountRaw: row.amountRaw,
    amount: Number(row.amountRaw) / 1e6,
    createdAt: row.createdAt,
  }))
}
