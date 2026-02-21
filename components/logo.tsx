import Link from "next/link"

interface LogoProps {
  className?: string
  href?: string
}

export function Logo({ className = "", href = "/" }: LogoProps) {
  const content = (
    <span
      className={`inline-flex flex-col font-bold tracking-tight ${className}`}
      aria-label="Monazon"
    >
      <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
        Monazon
      </span>
      {/* Sonrisa tipo Amazon, en morado */}
      <svg
        className="mt-0.5 h-1.5 w-14 shrink-0 text-purple-500"
        viewBox="0 0 56 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M1 5.5C15 1 41 1 55 5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0f] rounded">
        {content}
      </Link>
    )
  }

  return content
}
