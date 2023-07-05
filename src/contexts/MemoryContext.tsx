import { api } from '@/lib/api'
import { ReactNode, createContext, useState } from 'react'
import Cookies from 'js-cookie'

export interface MemoryProps {
  id: string
  coverUrl: string
  content: string
  isPublic: boolean
}

interface MemoryContextType {
  fetchMemory: (id: string) => void
}

export const MemoryContext = createContext({} as MemoryContextType)

interface MemoryContextProviderProps {
  children: ReactNode
}

export function MemoryContextProvider({
  children,
}: MemoryContextProviderProps) {
  const [memory, setMemory] = useState<MemoryProps>()

  async function fetchMemory(id: string) {
    const token = Cookies.get('token')
    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setMemory(response.data)
  }
  console.log(memory)

  return (
    <MemoryContext.Provider value={{ fetchMemory }}>
      {children}
    </MemoryContext.Provider>
  )
}
