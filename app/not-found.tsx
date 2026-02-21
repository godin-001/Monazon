import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold text-white">404</h1>
      <p className="mt-2 text-neutral-400">No encontramos esta página.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Ir al inicio
      </Link>
    </div>
  )
}
