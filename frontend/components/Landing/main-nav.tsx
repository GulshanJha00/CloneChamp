import Link from "next/link"
import { Code } from "lucide-react"
import { Button } from "../ui/button"

export default function MainNav() {
  return (
    <div className="px-16 flex h-16 items-center sticky top-0 left-0 bg-[hsl(var(--background))]/70 justify-between w-screen gap-6 md:gap-10"> 
      <nav className="hidden items-center md:flex gap-6">
      <Link href="/" className="flex items-center gap-2">
        <Code className="h-6 w-6" />
        <span className="font-bold inline-block">CloneChamp</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link href="/problems" className="text-sm font-medium transition-colors hover:text-primary">
          Problems
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
      <div className="ml-auto flex  space-x-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}
