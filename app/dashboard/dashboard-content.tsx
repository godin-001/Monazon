"use client"

import { useAccount } from "wagmi"
import { ConnectWallet } from "@/components/connect-wallet"
import { BalanceDisplay } from "@/components/balance-display"
import { BalanceMonDisplay } from "@/components/balance-mon-display"
import { CreatePaymentLinkForm } from "@/components/create-payment-link-form"
import { PaymentLinkCard } from "@/components/payment-link-card"
import { getLinksBySeller } from "@/lib/actions"
import { useEffect, useState } from "react"

interface LinkItem {
  id: string
  amount: number
  createdAt: Date | null
}

export function DashboardContent() {
  const { address } = useAccount()
  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) {
      setLinks([])
      return
    }
    let cancelled = false
    setLoading(true)
    getLinksBySeller(address)
      .then((data) => {
        if (!cancelled) setLinks(data)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [address])

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-white">Tu dashboard</h2>
        <p className="mt-1 text-neutral-400">
          Conecta tu wallet para ver tu balance y crear links de pago.
        </p>
        <div className="mt-6">
          <ConnectWallet />
        </div>
      </section>

      {address && (
        <>
          <section>
            <h3 className="mb-3 text-lg font-medium text-white">Balance</h3>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <BalanceMonDisplay />
              <BalanceDisplay />
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-lg font-medium text-white">Nuevo link de pago</h3>
            <div className="max-w-md rounded-xl border border-neutral-700 bg-neutral-900/50 p-6">
              <CreatePaymentLinkForm />
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-lg font-medium text-white">Tus links</h3>
            {loading ? (
              <p className="text-neutral-500">Cargando…</p>
            ) : links.length === 0 ? (
              <p className="text-neutral-500">Aún no has creado ningún link.</p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {links.map((link) => (
                  <li key={link.id}>
                    <PaymentLinkCard
                      id={link.id}
                      amount={link.amount}
                      createdAt={link.createdAt}
                      baseUrl={baseUrl}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  )
}
