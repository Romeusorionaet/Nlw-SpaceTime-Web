import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export interface MemoryProps {
  id: string
  coverUrl: string
  content: string
  isPublic: boolean
  userId: string
}

export default async function Details({ params }: { params: { id: string } }) {
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
        className="fixed top-0 flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm text-gray-200 hover:text-gray-100"
      >
        Ver outras memorias
      </Link>

      <div className="mt-20 space-y-8">
        <Image
          className="aspect-video w-full rounded-lg object-cover"
          width={550}
          height={200}
          src={memory.coverUrl}
          alt=""
        />

        <p>{memory.content}</p>
      </div>
    </div>
  )
}
