"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { createPaymentLink } from "@/lib/actions"

export function CreatePaymentLinkForm({ onCreated }: { onCreated?: () => void }) {
  const { address } = useAccount()
  const [amount, setAmount] = useState("")

  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!address) return
    const value = amount.trim().replace(",", ".")
    const num = Number(value)
    if (!value || Number.isNaN(num) || num <= 0) {
      setError("Ingresa un monto válido mayor a 0")
      return
    }

    setLoading(true)

      setError(null)
    setGeneratedUrl(null)

    try {
      const result = await createPaymentLink({
        sellerAddress: address,
        amount: value,
      })

      if (!result.ok) {
        setError(result.error ?? "Error al crear el link")
        return
      }

      const origin = typeof window !== "undefined" ? window.location.origin : ""

          setGeneratedUrl(`${origin}/pay/${result.id}`)
      setAmount("")
      onCreated?.()
    } catch {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  async function copyUrl() {
    if (!generatedUrl) return
    await navigator.clipboard.writeText(generatedUrl)
  }

  if (!address) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount-usd" className="mb-1 block text-sm font-medium text-neutral-300">
          Monto (USDC)
        </label>
        <input
          id="amount-usd"
          type="text"
          inputMode="decimal"
          placeholder="10.50"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}

                  className="w-full rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {generatedUrl && (
        <div className="flex items-center gap-2 rounded-lg bg-neutral-800/80 p-3">
          <code className="flex-1 truncate text-sm text-neutral-300">{generatedUrl}</code>
          <button
            type="button"
            onClick={copyUrl}
            className="shrink-0 rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Copiar

                      </button>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Creando..." : "Generar link de pago"}
      </button>
    </form>
  )
}

