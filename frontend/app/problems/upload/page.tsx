"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import MainNav from "@/components/Landing/main-nav"
import Footer from "@/components/Landing/footer"

export default function UploadChallengePage() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [designImage, setDesignImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setDesignImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Challenge uploaded",
        description: "Your design challenge has been uploaded successfully.",
      })
    }, 1500)
  }

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
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon">
              <Link href="/challenges">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to challenges</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Upload Design Challenge</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Share your design with the community and challenge others to clone it
          </p>
          <Separator className="my-6" />
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Challenge Details</CardTitle>
                <CardDescription>Provide information about your design challenge</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="E.g., Modern Dashboard UI" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your design challenge and any specific requirements..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select required>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="E.g., dashboard, responsive, dark-mode" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reward">Reward (optional)</Label>
                    <Input id="reward" type="number" placeholder="Amount in ₹" />
                    <p className="text-xs text-muted-foreground">
                      You can offer a reward to the first person who successfully clones your design with 95%+ accuracy.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="design-image">Upload Design Image</Label>
                    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-6">
                      {designImage ? (
                        <div className="relative w-full">
                          <img
                            src={designImage || "/placeholder.svg"}
                            alt="Design preview"
                            className="max-h-[300px] w-full rounded-lg object-contain"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="absolute right-2 top-2"
                            onClick={() => setDesignImage(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground" />
                          <div className="text-center">
                            <p className="text-sm font-medium">Drag and drop your design image</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG or GIF up to 10MB</p>
                          </div>
                          <Input
                            id="design-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("design-image")?.click()}
                          >
                            Select Image
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="mt-2" disabled={isUploading || !designImage}>
                    {isUploading ? "Uploading..." : "Upload Challenge"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>Learn about the design challenge upload process</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold">Upload Your Design</h3>
                      <p className="text-sm text-muted-foreground">
                        Share a high-quality image of your UI design that you want others to clone.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold">Set Challenge Parameters</h3>
                      <p className="text-sm text-muted-foreground">
                        Define difficulty, tags, and optionally offer a reward for successful clones.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold">Community Participation</h3>
                      <p className="text-sm text-muted-foreground">
                        Developers will attempt to clone your design with pixel-perfect accuracy.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold">Review Submissions</h3>
                      <p className="text-sm text-muted-foreground">
                        Our system automatically scores submissions, and you can review the results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Design Tips</CardTitle>
                  <CardDescription>Recommendations for creating effective challenges</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <p className="text-sm">• Upload high-resolution images for better accuracy scoring</p>
                  <p className="text-sm">• Include a detailed description of any interactions or animations</p>
                  <p className="text-sm">• Consider providing a Figma link for more complex designs</p>
                  <p className="text-sm">• Set an appropriate difficulty level based on complexity</p>
                  <p className="text-sm">• Add relevant tags to help developers find your challenge</p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Note: All uploaded designs are reviewed by our team before being published.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
