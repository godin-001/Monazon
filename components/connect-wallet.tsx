"use client"

import { useConnect, useDisconnect, useAccount } from "wagmi"
import { shortenAddress } from "@/lib/utils"

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-400">{shortenAddress(address)}</span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Desconectar
        </button>
      </div>
    )
  }

  const connector = connectors[0]
  if (!connector) return null

  return (
    <button
      type="button"
      onClick={() => connect({ connector })}
      disabled={isPending}
      className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
    >
      {isPending ? "Conectando…" : "Conectar Wallet"}
    </button>
  )
}
