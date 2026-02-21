import { http, createConfig } from "wagmi"
import { injected } from "wagmi/connectors"
import { monadMainnet } from "@/lib/chain"
import { monadTestnet } from "@/lib/monad"

export const config = createConfig({
  chains: [monadTestnet, monadMainnet],
  connectors: [injected()],
  transports: {
    [monadMainnet.id]: http("https://rpc.monad.xyz"),
    [monadTestnet.id]: http("https://rpc.testnet.monad.xyz"),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
