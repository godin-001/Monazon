"use client"

import { useEffect, useState } from "react"
import { useAccount, usePublicClient } from "wagmi"
import { formatEther } from "viem"

const POLL_INTERVAL_MS = 10_000

export function BalanceMonDisplay() {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const [balanceMon, setBalanceMon] = useState<string | null>(null)

  useEffect(() => {
    if (!address || !publicClient) {
      setBalanceMon(null)
      return
    }

    async function fetchBalance() {
      const value = await publicClient.getBalance({ address })
      setBalanceMon(formatEther(value))
    }

    fetchBalance()
    const intervalId = setInterval(fetchBalance, POLL_INTERVAL_MS)
    return () => clearInterval(intervalId)
  }, [address, publicClient])

  if (!address) return null
  if (balanceMon === null) return <span className="text-neutral-400">Cargando balance MON…</span>

  const value = Number(balanceMon)
  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-900/50 px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-neutral-500">Balance MON</p>
      <p className="text-2xl font-semibold text-white">
        {value.toLocaleString("es", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} MON
      </p>
    </div>
  )
}
