import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Layers, Trophy } from 'lucide-react'

const HowWork = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How CloneChamp Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Practice frontend development, Camp out. Clone real-world UIs Code with precision. Get real-time feedback and improve your skills.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Choose a Challenge</CardTitle>
                  <CardDescription>Select from 100+ challenges across different difficulty levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    From simple UI components to complex layouts, find challenges that match your skill level and goals.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Write Your Code</CardTitle>
                  <CardDescription>Use our built-in Monaco Editor to write HTML, CSS, and JavaScript</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our editor provides syntax highlighting, auto-completion, and live preview to help you code
                    efficiently.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Get Scored</CardTitle>
                  <CardDescription>Receive real-time feedback on your design accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our pixel comparison technology scores your implementation against the original design. Aim for 95%+
                    accuracy!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
  )
}

export default HowWork
