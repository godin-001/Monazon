"use client"

import { createContext, useContext } from "react"
import { useAccount } from "wagmi"

interface AddressContextValue {
  address: `0x${string}` | undefined
  isConnected: boolean
}

const AddressContext = createContext<AddressContextValue>({
  address: undefined,
  isConnected: false,
})

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()
  return (
    <AddressContext.Provider value={{ address, isConnected }}>
      {children}
    </AddressContext.Provider>
  )
}

export function useAddress() {
  return useContext(AddressContext)
}
