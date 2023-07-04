'use client'

import Cookies from 'js-cookie'
import { MemoryProps } from '../page'
import { api } from '@/lib/api'
// import { useEffect } from 'react'

export function ButtonEditAndSave({
  id,
  content,
  coverUrl,
  isPublic,
}: MemoryProps) {
  async function handleEditMemory() {
    const token = Cookies.get('token')
    console.log(token)
    // parei aq, no page tenho que fazer um meio de pegar os valores novos e passar aq
    await api.put(
      `/memories/${id}`,
      { content, coverUrl, isPublic },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }

  return (
    <div className="flex justify-between bg-gray-400">
      <button onClick={handleEditMemory}>Alterar memoria</button>
      <button>Salvar memoria alterada</button>
    </div>
  )
}
