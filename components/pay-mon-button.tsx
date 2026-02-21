"use client"

import { useState, useEffect } from "react"
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"

const MONAD_TESTNET_CHAIN_ID = 10143
const EXPLORER_URL = "https://testnet.monadscan.com"

interface PayMonButtonProps {
  vendorAddress: string
  amount: number
}

export function PayMonButton({ vendorAddress, amount }: PayMonButtonProps) {
  const { address, isConnected } = useAccount()
  const [confirmedHash, setConfirmedHash] = useState<string | null>(null)

  const { sendTransactionAsync, data: hash, isPending } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (hash && isSuccess) setConfirmedHash(hash)
  }, [hash, isSuccess])

  async function handlePay() {
    setConfirmedHash(null)
    const value = parseEther(amount.toString())
    await sendTransactionAsync({
      to: vendorAddress as `0x${string}`,
      value,
      chainId: MONAD_TESTNET_CHAIN_ID,
    })
  }

  const txHash = confirmedHash ?? hash
  if (txHash && !isPending && !isConfirming) {
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

  if (!isConnected || !address) {
    return (
      <p className="rounded-lg border border-amber-700/50 bg-amber-900/20 py-3 text-center text-sm text-amber-200">
        Conecta tu wallet para pagar
      </p>
    )
  }

  const loading = isPending || isConfirming

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={loading}
      className="w-full rounded-lg bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
    >
      {loading ? "Esperando confirmación..." : `Pagar ${amount.toLocaleString("es")} MON`}
    </button>
  )
}
