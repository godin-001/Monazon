import { notFound } from "next/navigation"
import { getPaymentLinkById } from "@/lib/actions"
import { PayButton } from "@/components/pay-button"
import { PayButtonEthers } from "@/components/pay-button-ethers"
import { ConnectWallet } from "@/components/connect-wallet"
import { Logo } from "@/components/logo"
import { shortenAddress } from "@/lib/utils"

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ amount?: string }>
}

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

export default async function PayPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { amount: amountQuery } = await searchParams

  const isVendorAddress = ADDRESS_REGEX.test(id)
  if (isVendorAddress && amountQuery != null) {
    const amount = Number(amountQuery)
    if (!Number.isNaN(amount) && amount > 0) {
      return (
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-neutral-800 px-6 py-4">
            <div className="mx-auto flex max-w-4xl items-center justify-between">
              <Logo className="text-xl" href="/" />
              <ConnectWallet />
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
            <div className="rounded-2xl border border-neutral-700 bg-neutral-900/80 p-8 shadow-xl">
              <h1 className="text-center text-2xl font-bold text-white">Link de pago</h1>
              <p className="mt-2 text-center text-neutral-400">
                Monto a pagar (MON nativo)
              </p>
              <p className="mt-4 text-center text-4xl font-bold text-white">
                {amount.toLocaleString("es", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                MON
              </p>
              <p className="mt-2 text-center text-sm text-neutral-500">
                A {shortenAddress(id)}
              </p>
              <div className="mt-8">
                <PayButtonEthers vendorAddress={id} amount={String(amount)} />
              </div>
            </div>
          </main>
        </div>
      )
    }
  }

  const paymentLink = await getPaymentLinkById(id)
  if (!paymentLink) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Logo className="text-xl" href="/" />
          <ConnectWallet />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <div className="rounded-2xl border border-neutral-700 bg-neutral-900/80 p-8 shadow-xl">
          <h1 className="text-center text-2xl font-bold text-white">Pago en USDC</h1>
          <p className="mt-2 text-center text-neutral-400">
            Monto a pagar en Monad (USDC)
          </p>
          <p className="mt-4 text-center text-4xl font-bold text-white">
            {paymentLink.amount.toLocaleString("es", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USDC
          </p>
          <div className="mt-8">
            <PayButton
              sellerAddress={paymentLink.sellerAddress}
              amountRaw={paymentLink.amountRaw}
              amountFormatted={paymentLink.amount}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
