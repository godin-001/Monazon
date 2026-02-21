"use client"

import { useState } from "react"

interface PaymentLinkCardProps {
  id: string
  amount: number
  createdAt: Date | null
  baseUrl: string
}

export function PaymentLinkCard({ id, amount, createdAt, baseUrl }: PaymentLinkCardProps) {
  const [copied, setCopied] = useState(false)
  const url = `${baseUrl}/pay/${id}`

  async function copy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const dateStr = createdAt
    ? new Date(createdAt).toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" })
    : "—"

  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-900/50 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-white">
            {amount.toLocaleString("es", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
          </p>
          <p className="text-xs text-neutral-500">{dateStr}</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded bg-neutral-700 px-3 py-1.5 text-sm text-white hover:bg-neutral-600"
        >
          {copied ? "Copiado" : "Copiar link"}
        </button>
      </div>
      <p className="mt-2 truncate text-sm text-neutral-400">{url}</p>
    </div>
  )
}
