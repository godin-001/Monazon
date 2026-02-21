import { ConnectWallet } from "@/components/connect-wallet"
import { Logo } from "@/components/logo"
import { DashboardContent } from "./dashboard-content"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Logo className="text-xl" href="/" />
          <ConnectWallet />
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        <DashboardContent />
      </main>
    </div>
  )
}
