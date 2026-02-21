import Link from "next/link"
import dynamic from "next/dynamic"
import { Logo } from "@/components/logo"

const ConnectWalletHome = dynamic(
  () => import("@/components/connect-wallet-home").then((m) => ({ default: m.ConnectWalletHome })),
  { ssr: false, loading: () => <div className="h-10 w-[140px] rounded-lg bg-neutral-800/50" /> }
)

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Logo className="text-xl" href="/" />
          <ConnectWalletHome />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-16">
        <h1 className="text-center text-3xl font-bold text-white md:text-4xl">
          Cobra en USDC con <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">Monazon</span>
        </h1>
        <p className="mt-4 max-w-md text-center text-neutral-400">
          Conecta tu wallet, genera un link de pago con monto fijo y compártelo. Tu cliente paga en
          stablecoin y tú ves el balance al instante.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
          >
            Ir al dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
