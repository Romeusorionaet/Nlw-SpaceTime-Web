import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

export interface MemoryProps {
  id: string
  coverUrl: string
  content: string
  isPublic: boolean
  userId: string
  createdAt: string
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
    <div className="px-4 pt-10 ">
      <Link
        href={`/`}
        className="flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm text-gray-200 hover:text-gray-100 max-Mobile:right-4 max-Mobile:top-[22rem]"
      >
        <ChevronLeft className="h-4 w-4" />
        Ver outras memorias
      </Link>

      <time className="my-10 -ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>

      <div className="my-20 space-y-8 max-Mobile:mt-0">
        <Image
          className="aspect-video w-full rounded-lg object-contain"
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
