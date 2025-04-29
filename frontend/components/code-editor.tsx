"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function CodeEditor({ language, value, onChange, className = "" }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`${className} bg-muted`} />
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={value}
      onChange={(value) => onChange(value || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      className={className}
    />
  )
}
