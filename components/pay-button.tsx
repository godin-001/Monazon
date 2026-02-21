"use client"

import { useState, useEffect } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { monadTestnet } from "viem/chains"
import { USDC_ADDRESS, ERC20_ABI } from "@/lib/chain"

interface PayButtonProps {
sellerAddress: string
amountRaw: string
amountFormatted: number
}

export function PayButton({ sellerAddress, amountRaw, amountFormatted }: PayButtonProps) {
const { address, isConnected } = useAccount()

  const [successTx, setSuccessTx] = useState<string | null>(null)

const { writeContract, data: hash, isPending } = useWriteContract()
const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

useEffect(() => {
if (hash && isConfirmed) setSuccessTx(hash)
}, [hash, isConfirmed])

function handlePay() {
setSuccessTx(null)
writeContract({
address: USDC_ADDRESS,
abi: ERC20_ABI,
functionName: "transfer",

  args: [sellerAddress as `0x${string}`, BigInt(amountRaw)],
chainId: monadTestnet.id,
})
}

if (successTx || (hash && !isPending && !isConfirming)) {
const txHash = successTx ?? hash
const explorerUrl = `${monadTestnet.blockExplorers.default.url}/tx/${txHash}`
return (
<div className="rounded-lg bg-green-900/30 border border-green-700/50 p-4 text-center">
<p className="font-medium text-green-400">Pago confirmado</p>
<a href={explorerUrl} target="_blank" rel="noopener noreferrer"
className="mt-2 inline-block text-sm text-indigo-400 hover:underline">
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

  <button type="button" onClick={handlePay} disabled={loading}
className="w-full rounded-lg bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50">
{loading ? "Esperando confirmación..." : `Pagar ${amountFormatted.toLocaleString("es")} USDC`}
</button>
)
}
