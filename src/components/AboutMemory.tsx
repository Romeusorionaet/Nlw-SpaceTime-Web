'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MemoryIdProp {
  memoryId: string
}

export function AboutMemory({ memoryId }: MemoryIdProp) {
  const { push } = useRouter()

  function handleAboutMemory() {
    return push(`/memories/Details/${memoryId}`)
  }

  return (
    <>
      <button
        onClick={handleAboutMemory}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        Ler mais
        <ArrowRight className="h-4 w-4" />
      </button>
    </>
  )
}
