import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const MainPage = () => {
  return (
    <section className="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master <span className='text-blue-400'>Frontend</span>  Development with CloneChamp
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Clone designs with pixel-perfect accuracy. Practice, compete, and improve your frontend skills with
                    real-world challenges.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link className='text-white' href="/problems">
                      Start Challenges <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/how-it-works">How It Works</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-gradient-to-b from-background/10 to-background/50 p-4 shadow-xl">
                  <div className="absolute  inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="relative z-10 flex h-full flex-col rounded-lg border bg-background p-4 shadow-lg">
                    <div className="mb-4 flex items-center gap-2 border-b pb-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-xs font-medium">Challenge Editor</div>
                    </div>
                    <div className="flex flex-1 gap-2">
                      <div className="w-1/2 rounded-md bg-muted p-2">
                        <div className="mb-2 h-32 rounded bg-primary/10"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-3/4 rounded bg-primary/20"></div>
                          <div className="h-4 w-1/2 rounded bg-primary/20"></div>
                          <div className="h-4 w-5/6 rounded bg-primary/20"></div>
                        </div>
                      </div>
                      <div className="w-1/2 rounded-md bg-muted/50 p-2 font-mono text-xs">
                        <div className="text-blue-500">{"<div"}</div>
                        <div className="pl-4 text-green-500">{'className="card">'}</div>
                        <div className="pl-6 text-blue-500">{"<h2>"}</div>
                        <div className="pl-8">Product Title</div>
                        <div className="pl-6 text-blue-500">{"</h2>"}</div>
                        <div className="pl-6 text-blue-500">{"<p>"}</div>
                        <div className="pl-8">Description goes here...</div>
                        <div className="pl-6 text-blue-500">{"</p>"}</div>
                        <div className="pl-6 text-blue-500">{"<button>"}</div>
                        <div className="pl-8">Add to Cart</div>
                        <div className="pl-6 text-blue-500">{"</button>"}</div>
                        <div className="pl-4 text-blue-500">{"</div>"}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-2">
                      <div className="text-xs">
                        Accuracy: <span className="font-medium text-green-500">96%</span>
                      </div>
                      <div className="text-xs">
                        Time Taken: <span className="font-medium">04:32</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default MainPage
