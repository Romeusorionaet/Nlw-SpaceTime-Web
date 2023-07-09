import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { MemoryProps } from '../../details/[id]/page'
import { AlterMemory } from '../components/AlterMemory'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function Update({ params }: { params: { id: string } }) {
  const id = params.id

  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const memory: MemoryProps = response.data

  return (
    <div className="px-4 pt-10">
      <Link
        href={`/`}
        className="fixed top-16 flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Ver outras memorias
      </Link>

      <AlterMemory memory={memory} />
    </div>
  )
}
