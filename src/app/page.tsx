import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

dayjs.locale(ptBR)

interface Memory {
  id: string
  userId: string
  coverUrl: string
  excerpt: string
  isPublic: boolean
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data.memories
  const userIdOn: string = response.data.userIdOn

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <div className="flex justify-between">
              <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </time>

              {userIdOn === memory.userId ? (
                <Link href={`/memories/update/${memory.id}`}>
                  Alterar memoria
                </Link>
              ) : (
                <></>
              )}
            </div>

            <div className="max-w-[50rem]">
              <Image
                src={memory.coverUrl}
                alt=""
                width={592}
                height={280}
                className="aspect-video w-full rounded-lg object-cover"
              />
            </div>
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <div className="flex justify-between">
              <Link
                href={`/memories/details/${memory.id}`}
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
              >
                Ler mais
                <ArrowRight className="h-4 w-4" />
              </Link>

              {memory.isPublic === true ? <></> : <span>Privado</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
