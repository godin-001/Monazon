"use client"

import { useState, useEffect } from "react"
import { ensureMonadNetwork, getSigner } from "@/lib/monad"

export function ConnectWalletHome() {
  const [mounted, setMounted] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => setMounted(true), [])

  async function handleConnect() {
    if (typeof window === "undefined" || !window.ethereum) {
      setError("No se detectó una wallet. Instala MetaMask u otra compatible.")
      return
    }
    setLoading(true)
    setAddress(null)
    setError(null)
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      await ensureMonadNetwork()
      const signer = await getSigner()
      const addr = await signer.getAddress()
      setAddress(addr)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al conectar"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="h-10 w-[140px] animate-pulse rounded-lg bg-neutral-800" aria-hidden />
    )
  }

  if (address) {
    const short = `${address.slice(0, 6)}...${address.slice(-4)}`
    return (
      <span className="text-sm text-neutral-300">{short}</span>
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      {error && (
        <span className="text-xs text-red-400 max-w-[200px] text-right">{error}</span>
      )}
      <button
        type="button"
        onClick={handleConnect}
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Conectando…" : "Conectar Wallet"}
      </button>
    </div>
  )
}
