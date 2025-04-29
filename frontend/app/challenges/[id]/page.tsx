"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Eye, EyeOff, Maximize2, Play, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import CodeEditor from "@/components/code-editor"
import MainNav from "@/components/Landing/main-nav"

export default function ChallengePage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [accuracy, setAccuracy] = useState(0)
  const [showPreview, setShowPreview] = useState(true)
  const [htmlCode, setHtmlCode] = useState(`<div class="product-card">
  <img src="https://via.placeholder.com/300" alt="Product Image" class="product-image">
  <h2 class="product-title">Product Title</h2>
  <p class="product-description">This is a product description. It provides details about the product.</p>
  <div class="product-price">$99.99</div>
  <button class="add-to-cart-button">Add to Cart</button>
</div>`)

  const [cssCode, setCssCode] = useState(`.product-card {
  width: 300px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: system-ui, sans-serif;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem;
}

.product-description {
  color: #64748b;
  margin: 0 1rem 1rem;
  font-size: 0.875rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 1rem;
}

.add-to-cart-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  margin: 1rem;
  width: calc(100% - 2rem);
}

.add-to-cart-button:hover {
  background-color: #2563eb;
}`)

  const [jsCode, setJsCode] = useState(`// Add your JavaScript code here
const addToCartButton = document.querySelector('.add-to-cart-button');

addToCartButton.addEventListener('click', () => {
  console.log('Product added to cart!');
  addToCartButton.textContent = 'Added to Cart';
  addToCartButton.style.backgroundColor = '#10b981';
});`)

  useEffect(() => {
    // Simulate accuracy calculation
    const timer = setTimeout(() => {
      const newAccuracy = Math.min(accuracy + 5, 87)
      setAccuracy(newAccuracy)
    }, 1000)
    return () => clearTimeout(timer)
  }, [accuracy])

  const handleRunCode = () => {
    toast({
      title: "Code executed",
      description: "Your solution has been evaluated.",
    })
    // Simulate accuracy calculation
    const newAccuracy = Math.floor(Math.random() * 15) + 80
    setAccuracy(newAccuracy)
  }

  const handleSaveCode = () => {
    toast({
      title: "Progress saved",
      description: "Your code has been saved successfully.",
    })
  }

  const handleSubmitSolution = () => {
    if (accuracy >= 95) {
      toast({
        title: "Challenge completed!",
        description: "Congratulations! You've successfully completed this challenge.",
      })
    } else {
      toast({
        title: "Almost there!",
        description: `Your solution is ${accuracy}% accurate. Aim for at least 95% to complete the challenge.`,
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/challenges">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to challenges</span>
              </Link>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleSaveCode}>
                    <Save className="h-4 w-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save progress</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setShowPreview(!showPreview)}>
                    {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle preview</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{showPreview ? "Hide preview" : "Show preview"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Maximize2 className="h-4 w-4" />
                    <span className="sr-only">Fullscreen</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Fullscreen</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button onClick={handleRunCode}>
              <Play className="mr-2 h-4 w-4" />
              Run
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Product Card Component</h1>
                <Badge variant="outline">Easy</Badge>
              </div>
              <p className="text-muted-foreground">
                Create a responsive product card with image, title, price, and add to cart button.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm font-medium">{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="h-2 w-40" />
              </div>
              <Button onClick={handleSubmitSolution}>Submit Solution</Button>
            </div>
          </div>
          <Separator className="my-4" />
          <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-12rem)] rounded-lg border">
            <ResizablePanel defaultSize={50} minSize={30}>
              <Tabs defaultValue="html" className="h-full">
                <div className="flex items-center justify-between border-b px-4">
                  <TabsList className="h-12">
                    <TabsTrigger value="html" className="px-4">
                      HTML
                    </TabsTrigger>
                    <TabsTrigger value="css" className="px-4">
                      CSS
                    </TabsTrigger>
                    <TabsTrigger value="js" className="px-4">
                      JavaScript
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <TabsContent value="html" className="h-[calc(100%-3rem)] p-0 data-[state=active]:flex">
                  <CodeEditor language="html" value={htmlCode} onChange={setHtmlCode} className="h-full" />
                </TabsContent>
                <TabsContent value="css" className="h-[calc(100%-3rem)] p-0 data-[state=active]:flex">
                  <CodeEditor language="css" value={cssCode} onChange={setCssCode} className="h-full" />
                </TabsContent>
                <TabsContent value="js" className="h-[calc(100%-3rem)] p-0 data-[state=active]:flex">
                  <CodeEditor language="javascript" value={jsCode} onChange={setJsCode} className="h-full" />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle />
            {showPreview && (
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="flex h-full flex-col">
                  <div className="flex h-12 items-center justify-between border-b px-4">
                    <h3 className="font-medium">Preview</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Maximize2 className="mr-2 h-4 w-4" />
                        Fullscreen
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    <div className="flex min-h-full flex-col items-center justify-center">
                      <div className="relative w-full">
                        <iframe
                          title="Preview"
                          className="h-[calc(100vh-16rem)] w-full rounded-md border bg-white"
                          srcDoc={`
                            <!DOCTYPE html>
                            <html>
                              <head>
                                <style>${cssCode}</style>
                              </head>
                              <body>
                                ${htmlCode}
                                <script>${jsCode}</script>
                              </body>
                            </html>
                          `}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </div>
      </main>
    </div>
  )
}
