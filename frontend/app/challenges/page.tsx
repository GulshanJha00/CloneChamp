import Link from "next/link"
import { ChevronRight, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"

export default function ChallengesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Challenges</h1>
              <p className="text-muted-foreground">Browse and solve frontend challenges to improve your skills</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search challenges..." className="w-full pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">View options</span>
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[state=active]:border-primary"
              >
                All Challenges
              </TabsTrigger>
              <TabsTrigger
                value="easy"
                className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[state=active]:border-primary"
              >
                Easy
              </TabsTrigger>
              <TabsTrigger
                value="medium"
                className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[state=active]:border-primary"
              >
                Medium
              </TabsTrigger>
              <TabsTrigger
                value="hard"
                className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[state=active]:border-primary"
              >
                Hard
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[state=active]:border-primary"
              >
                Community
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {challenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="easy" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {challenges
                  .filter((challenge) => challenge.difficulty === "Easy")
                  .map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="medium" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {challenges
                  .filter((challenge) => challenge.difficulty === "Medium")
                  .map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="hard" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {challenges
                  .filter((challenge) => challenge.difficulty === "Hard")
                  .map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="community" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {challenges
                  .filter((challenge) => challenge.type === "Community")
                  .map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  type: "Official" | "Community"
  tags: string[]
  completions: number
  image: string
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={challenge.image || "/placeholder.svg?height=200&width=400"}
          alt={challenge.title}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1">{challenge.title}</CardTitle>
          <Badge
            variant={
              challenge.difficulty === "Easy"
                ? "success"
                : challenge.difficulty === "Medium"
                  ? "warning"
                  : "destructive"
            }
            className="ml-2 whitespace-nowrap"
          >
            {challenge.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{challenge.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {challenge.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">{challenge.completions.toLocaleString()} completions</div>
        <Button asChild size="sm">
          <Link href={`/challenges/${challenge.id}`}>
            Start <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Product Card Component",
    description: "Create a responsive product card with image, title, price, and add to cart button.",
    difficulty: "Easy",
    type: "Official",
    tags: ["HTML", "CSS", "Component"],
    completions: 1245,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Navigation Bar",
    description: "Build a responsive navigation bar with dropdown menus and mobile toggle.",
    difficulty: "Medium",
    type: "Official",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    completions: 876,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "E-commerce Product Page",
    description: "Create a complete product page with image gallery, reviews, and add to cart functionality.",
    difficulty: "Hard",
    type: "Official",
    tags: ["HTML", "CSS", "JavaScript", "Complex Layout"],
    completions: 432,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "Testimonial Grid",
    description: "Build a responsive testimonial grid with different card sizes and layouts.",
    difficulty: "Easy",
    type: "Official",
    tags: ["HTML", "CSS", "Grid"],
    completions: 987,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Pricing Table",
    description: "Create a responsive pricing table with highlighted recommended plan.",
    difficulty: "Medium",
    type: "Official",
    tags: ["HTML", "CSS", "Pricing"],
    completions: 654,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    title: "Dashboard UI",
    description: "Build a complex dashboard interface with charts, tables, and sidebar navigation.",
    difficulty: "Hard",
    type: "Official",
    tags: ["HTML", "CSS", "JavaScript", "Dashboard"],
    completions: 321,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "7",
    title: "Login Form",
    description: "Create a stylish login form with validation and error states.",
    difficulty: "Easy",
    type: "Community",
    tags: ["HTML", "CSS", "Form"],
    completions: 1432,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "8",
    title: "Todo App",
    description: "Build a functional todo app with add, edit, delete, and filter capabilities.",
    difficulty: "Medium",
    type: "Community",
    tags: ["HTML", "CSS", "JavaScript", "CRUD"],
    completions: 765,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "9",
    title: "E-commerce Checkout Flow",
    description: "Create a multi-step checkout process with form validation and order summary.",
    difficulty: "Hard",
    type: "Community",
    tags: ["HTML", "CSS", "JavaScript", "Forms", "Validation"],
    completions: 234,
    image: "/placeholder.svg?height=200&width=400",
  },
]
