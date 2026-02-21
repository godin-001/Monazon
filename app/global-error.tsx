"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#0a0a0f] p-8 text-white">
        <h1 className="text-xl font-bold">Algo salió mal</h1>
        <p className="mt-2 text-neutral-400">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500"
        >
          Reintentar
        </button>
      </body>
    </html>
  )
}
