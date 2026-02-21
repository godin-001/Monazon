"use client"

import { useEffect } from "react"
import { useAccount, useSwitchChain } from "wagmi"

const MONAD_TESTNET_CHAIN_ID = 10143
const MONAD_TESTNET_HEX = "0x279f"

const ADD_CHAIN_PARAMS = {
  chainId: MONAD_TESTNET_HEX,
  chainName: "Monad Testnet",
  rpcUrls: ["https://rpc.testnet.monad.xyz"],
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  blockExplorerUrls: ["https://testnet.monadscan.com"],
}

export function useEnsureMonadTestnet() {
  const { isConnected, chain } = useAccount()
  const { switchChainAsync } = useSwitchChain()

  useEffect(() => {
    if (!isConnected || chain?.id === MONAD_TESTNET_CHAIN_ID) return

    const run = async () => {
      try {
        await switchChainAsync?.({ chainId: MONAD_TESTNET_CHAIN_ID })
      } catch {
        const ethereum = typeof window !== "undefined" ? (window as Window & { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<void> } }).ethereum : undefined
        if (!ethereum) return
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [ADD_CHAIN_PARAMS],
          })
          await switchChainAsync?.({ chainId: MONAD_TESTNET_CHAIN_ID })
        } catch {
          // Usuario rechazó o wallet no soporta
        }
      }
    }

    run()
  }, [isConnected, chain?.id, switchChainAsync])
}
