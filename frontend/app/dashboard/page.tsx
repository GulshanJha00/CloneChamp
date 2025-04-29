import Link from "next/link"
import { BarChart3, Calendar, Clock, Code, Layout, LineChart, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MainNav from "@/components/main-nav"
import UserNav from "@/components/user-nav"
import Footer from "@/components/footer"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Track your progress and manage your challenges</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/challenges">
                  <Code className="mr-2 h-4 w-4" />
                  Start New Challenge
                </Link>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="challenges">My Challenges</TabsTrigger>
              <TabsTrigger value="uploads">My Uploads</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Challenges Completed</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+3 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92.7%</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">XP Earned</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3,450</div>
                    <p className="text-xs text-muted-foreground">+450 this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">#42</div>
                    <p className="text-xs text-muted-foreground">Up 5 positions</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your challenge activity over the past 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Completed "Product Card Component" challenge
                          </p>
                          <p className="text-xs text-muted-foreground">2 hours ago • 96% accuracy</p>
                        </div>
                        <Badge>+150 XP</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Layout className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Started "E-commerce Product Page" challenge
                          </p>
                          <p className="text-xs text-muted-foreground">Yesterday • In progress</p>
                        </div>
                        <Badge variant="outline">Hard</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Code className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Uploaded "Modern Dashboard UI" design challenge
                          </p>
                          <p className="text-xs text-muted-foreground">2 days ago • 3 submissions</p>
                        </div>
                        <Badge variant="secondary">+50 XP</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Completed "Navigation Bar" challenge</p>
                          <p className="text-xs text-muted-foreground">3 days ago • 89% accuracy</p>
                        </div>
                        <Badge>+120 XP</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Current Streak</CardTitle>
                    <CardDescription>Keep your daily coding streak going</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center space-y-2">
                      <div className="flex flex-col items-center">
                        <div className="text-5xl font-bold">7</div>
                        <p className="text-sm text-muted-foreground">days</p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="text-xs text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</div>
                          <div className="mt-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                            ✓
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-center">Complete a challenge today to continue your streak!</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Progress value={75} className="h-2" />
                        <span className="text-xs font-medium">18:45:32 left</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Challenges</CardTitle>
                    <CardDescription>Challenges scheduled for this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Weekly Challenge: Pricing Table</p>
                          <p className="text-xs text-muted-foreground">Tomorrow • 10:00 AM</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Timed Challenge: Login Form</p>
                          <p className="text-xs text-muted-foreground">Friday • 6:00 PM</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Users className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Community Challenge: Portfolio</p>
                          <p className="text-xs text-muted-foreground">Saturday • 2:00 PM</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Progress</CardTitle>
                    <CardDescription>Your progress in different skill areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">HTML</p>
                          <p className="text-sm font-medium">92%</p>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">CSS</p>
                          <p className="text-sm font-medium">87%</p>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">JavaScript</p>
                          <p className="text-sm font-medium">75%</p>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Responsive Design</p>
                          <p className="text-sm font-medium">83%</p>
                        </div>
                        <Progress value={83} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Accessibility</p>
                          <p className="text-sm font-medium">68%</p>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>This week's leaderboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            1
                          </div>
                        </div>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt="@user1" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Jane Doe</p>
                          <p className="text-xs text-muted-foreground">5,240 XP</p>
                        </div>
                        <Badge variant="secondary">98.2%</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            2
                          </div>
                        </div>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt="@user2" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">John Smith</p>
                          <p className="text-xs text-muted-foreground">4,980 XP</p>
                        </div>
                        <Badge variant="secondary">97.5%</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            3
                          </div>
                        </div>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt="@user3" />
                          <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Alex Kim</p>
                          <p className="text-xs text-muted-foreground">4,750 XP</p>
                        </div>
                        <Badge variant="secondary">96.8%</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold">
                            42
                          </div>
                        </div>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt="@you" />
                          <AvatarFallback>YO</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">You</p>
                          <p className="text-xs text-muted-foreground">3,450 XP</p>
                        </div>
                        <Badge variant="outline">92.7%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="challenges" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Challenge cards would go here */}
                <Card>
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Challenge preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="line-clamp-1">E-commerce Product Page</CardTitle>
                      <Badge variant="destructive">Hard</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">Last worked on: Yesterday</p>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button className="w-full">Continue</Button>
                  </div>
                </Card>
                <Card>
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Challenge preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="line-clamp-1">Dashboard UI</CardTitle>
                      <Badge variant="destructive">Hard</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">Last worked on: 3 days ago</p>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button className="w-full">Continue</Button>
                  </div>
                </Card>
                <Card>
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Challenge preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="line-clamp-1">Todo App</CardTitle>
                      <Badge variant="warning">Medium</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">70%</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">Last worked on: 1 week ago</p>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button className="w-full">Continue</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="uploads" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Upload cards would go here */}
                <Card>
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Design preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="line-clamp-1">Modern Dashboard UI</CardTitle>
                      <Badge variant="outline">3 submissions</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      A clean and modern dashboard interface with dark mode support and responsive layout.
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <Badge variant="secondary">dashboard</Badge>
                      <Badge variant="secondary">dark-mode</Badge>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      View Submissions
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="stats" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge Completion</CardTitle>
                    <CardDescription>Your challenge completion rate by difficulty</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>XP Growth</CardTitle>
                    <CardDescription>Your XP growth over the past 3 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
