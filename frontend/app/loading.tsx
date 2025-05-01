// app/loading.tsx
'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-foreground">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
        <h1 className="text-xl text-white font-semibold">Loading the Challenge Zone...</h1>
        <p className="text-gray-400 text-sm">Hold tight! We&apos;re setting up your coding arena.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 2,
        }}
        className="absolute bottom-10 flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Sparkles className="w-4 h-4 animate-pulse" />
        Real-time layout match in progress...
      </motion.div>
    </div>
  )
}

export default Loading
