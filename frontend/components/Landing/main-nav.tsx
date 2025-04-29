import Link from "next/link"
import { Code } from "lucide-react"

export default function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2">
        <Code className="h-6 w-6" />
        <span className="font-bold inline-block">CloneChamp</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link href="/challenges" className="text-sm font-medium transition-colors hover:text-primary">
          Challenges
        </Link>
        <Link href="/challenges/upload" className="text-sm font-medium transition-colors hover:text-primary">
          Upload Design
        </Link>
        <Link href="/leaderboard" className="text-sm font-medium transition-colors hover:text-primary">
          Leaderboard
        </Link>
        <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
          Pricing
        </Link>
      </nav>
    </div>
  )
}
