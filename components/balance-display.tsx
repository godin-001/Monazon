"use client"

import { useAccount, useReadContract } from "wagmi"
import { USDC_ADDRESS, ERC20_ABI, USDC_DECIMALS } from "@/lib/chain"
import { formatUnits } from "viem"

export function BalanceDisplay() {
  const { address } = useAccount()
  const { data: balance, isLoading } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  })

  if (!address) return null
  if (isLoading) return <span className="text-neutral-400">Cargando balance…</span>

  const formatted = balance != null ? formatUnits(balance, USDC_DECIMALS) : "0"
  const value = Number(formatted)

  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-900/50 px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-neutral-500">Balance USDC</p>
      <p className="text-2xl font-semibold text-white">
        {value.toLocaleString("es", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
      </p>
    </div>
  )
}
