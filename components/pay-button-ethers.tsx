"use client"

import { useState } from "react"
import { parseEther } from "ethers"
import { getSigner } from "@/lib/monad"

const EXPLORER_URL = "https://testnet.monadscan.com"

interface PayButtonEthersProps {
  vendorAddress: string
  amount: string
}

export function PayButtonEthers({ vendorAddress, amount }: PayButtonEthersProps) {
  const [status, setStatus] = useState<"idle" | "pending" | "confirmed">("idle")
  const [txHash, setTxHash] = useState<string | null>(null)

  async function handlePay() {
    setStatus("pending")
    setTxHash(null)
    try {
      const signer = await getSigner()
      const tx = await signer.sendTransaction({
        to: vendorAddress,
        value: parseEther(amount),
      })
      await tx.wait()
      setTxHash(tx.hash)
      setStatus("confirmed")
    } catch {
      setStatus("idle")
    }
  }

  if (status === "confirmed" && txHash) {
    return (
      <div className="rounded-lg border border-green-700/50 bg-green-900/30 p-4 text-center">
        <p className="font-medium text-green-400">Pago confirmado</p>
        <a
          href={`${EXPLORER_URL}/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-indigo-400 hover:underline"
        >
          Ver en explorador →
        </a>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={status === "pending"}
      className="w-full rounded-lg bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
    >
      {status === "pending" ? "Esperando confirmación..." : "Pagar"}
    </button>
  )
}
