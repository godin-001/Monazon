import { BrowserProvider } from "ethers"
import { defineChain } from "viem"

export const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "MonadScan", url: "https://testnet.monadscan.com" },
  },
})

const MONAD_CHAIN_ID = 10143
const MONAD_CHAIN_ID_HEX = "0x279F"

const ADD_CHAIN_PARAMS = {
  chainId: MONAD_CHAIN_ID_HEX,
  chainName: "Monad Testnet",
  rpcUrls: ["https://rpc.testnet.monad.xyz"],
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  blockExplorerUrls: ["https://testnet.monadscan.com"],
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    }
  }
}

export function getProvider(): BrowserProvider {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("window.ethereum no disponible")
  }
  return new BrowserProvider(window.ethereum)
}

export async function getSigner() {
  const provider = getProvider()
  return provider.getSigner()
}

export async function ensureMonadNetwork(): Promise<void> {
  const provider = getProvider()
  const network = await provider.getNetwork()
  if (Number(network.chainId) === MONAD_CHAIN_ID) return

  const ethereum = window.ethereum!
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: MONAD_CHAIN_ID_HEX }],
    })
  } catch {
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [ADD_CHAIN_PARAMS],
    })
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: MONAD_CHAIN_ID_HEX }],
    })
  }
}
