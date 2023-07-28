import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { AlterMemory } from '../components/AlterMemory'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { MemoryProps } from '../../details/[id]/page'

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
    <div className="px-4 py-10">
      <Link
        href={`/`}
        className="flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm text-gray-200 hover:text-gray-100 max-Mobile:right-4 max-Mobile:top-[22rem]"
      >
        <ChevronLeft className="h-4 w-4" />
        Ver outras memorias
      </Link>

      <AlterMemory memory={memory} />
    </div>
  )
}
