'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Rocket, Users } from 'lucide-react'

const steps = [
  {
    title: 'Step 1: Choose a Challenge',
    description: 'Browse through 100+ frontend problems categorized by difficulty (Easy, Medium, Hard).',
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
  },
  {
    title: 'Step 2: Write Code',
    description: 'Use the built-in code editor to solve challenges with live coding support.',
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
  },
  {
    title: 'Step 3: Get Real-Time Feedback',
    description: 'Your code is automatically scored based on pixel-perfect accuracy. Aim for 95% or higher to pass.',
    icon: <Rocket className="h-8 w-8 text-purple-500" />,
  },
  {
    title: 'Step 4: Collaborate with Designers',
    description: 'Designers upload their UI/UX designs, and developers solve them to earn XP or real value.',
    icon: <Users className="h-8 w-8 text-blue-500" />,
  },
]

const HowItWorks = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-background text-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">How It Works</h1>
        <p className="text-muted-foreground mb-12">
          Get started with CloneChamp in just a few steps. Solve frontend challenges, earn XP, and collaborate with designers!
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
