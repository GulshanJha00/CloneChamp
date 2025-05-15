'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Rocket, Users, Search } from 'lucide-react'

const steps = [
  {
    title: 'Step 1: Pick from Two Challenge Types',
    description:
      'Solve custom HTML/CSS challenges crafted by the platform, or choose from real UI designs uploaded by community designers.',
    icon: <Users className="h-8 w-8 text-blue-500" />,
  },
  {
    title: 'Step 2: Solve with Code',
    description: 'Use the built-in live code editor to replicate the UI using HTML and CSS.',
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
  },
  {
    title: 'Step 3: Designers Can Upload UI Challenges',
    description: 'Designers can submit real-world UI/UX layouts as coding challenges to get frontend solutions or showcase their work.',
    icon: <Users className="h-8 w-8 text-blue-500" />,
  },
  {
    title: 'Step 4: Choose a Challenge',
    description: 'Browse challenges based on difficulty (Easy, Medium, Hard) and pick one to solve.',
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
  },
  
  {
    title: 'Step 5: Earn XP from Pixel-Perfect Match',
    description: 'Your layout is scored automatically by matching against the original design provided by developers or by the platform. Achieve 95% or more to earn XP.',
    icon: <Rocket className="h-8 w-8 text-purple-500" />,
  },
  {
    title: "Step 6: Browse Design Challenges",
    description: "Explore designer-submitted layouts you can use for practice or personal projects.",
    icon: <Search className="h-8 w-8 text-purple-500" />,
  }
  
]

const HowItWorks = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-background text-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">How It Works</h1>
        <p className="text-muted-foreground mb-12">
          CloneChamp connects designers and developers. Designers upload creative challenges, and developers sharpen their frontend skills by solving them!
        </p>
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="flex items-start gap-4 bg-muted/20 p-6 rounded-xl shadow-sm"
            >
              <div>{step.icon}</div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link href="/problems">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
