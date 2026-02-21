"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { config } from "@/lib/wagmi-config"
import { AddressProvider } from "@/contexts/address-context"
import { EnsureMonadTestnet } from "@/components/ensure-monad-testnet"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AddressProvider>
          <EnsureMonadTestnet />
          {children}
        </AddressProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
