'use client'

import { Camera } from 'lucide-react'
import Cookie from 'js-cookie'
import { FormEvent, useState } from 'react'
import { MemoryProps } from '../../details/[id]/page'
import { MediaPicker } from '@/components/MediaPicker'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface MemoryProp {
  memory: MemoryProps
}

export function AlterMemory({ memory }: MemoryProp) {
  const [content, setContent] = useState(memory.content)
  const [isPublic, setIsPublic] = useState(memory.isPublic)

  const router = useRouter()
  const token = Cookie.get('token')

  async function handleDeleteMemory() {
    const handleRequest = confirm('Tem certeza que deseja apagar esta memória?')
    if (handleRequest === false) {
      return
    }

    try {
      await api.delete(`/memories/${memory.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error)
      return alert('Problema ao apagar a memória!')
    }

    router.refresh()
    router.push('/')
  }

  async function handleAlterMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fileToUpload: any = formData.get('coverUrl')

    let coverUrl = ''

    const uploadFormData = new FormData()
    uploadFormData.append('cover', fileToUpload)

    if (fileToUpload!.name !== '') {
      try {
        const uploadResponse = await api.post('upload', uploadFormData)

        coverUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.log(error)
        return alert('Imagem não cadastrada!')
      }
    }

    if (!content) {
      return alert('A sua memória precisa de uma descrição')
    }

    try {
      await api.put(
        `memories/${memory.id}`,
        {
          coverUrl: coverUrl !== '' ? coverUrl : memory.coverUrl,
          content,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } catch (error) {
      console.log(error)
      return alert('Erro ao cadastrar a memória!')
    }

    router.refresh()
    router.push('/')
  }

  return (
    <form onSubmit={handleAlterMemory}>
      {memory && (
        <div className="mt-20 space-y-8">
          <div className="flex items-center gap-4">
            <label
              htmlFor="media"
              className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <Camera className="h-4 w-4" />
              Anexar mídia
            </label>

            <label
              htmlFor="isPublic"
              className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                value={memory.isPublic === true ? 'true' : 'false'}
                onChange={() => setIsPublic((prevState) => !prevState)}
                checked={isPublic}
                className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
              />
              Tornar memória pública
            </label>
          </div>

          <MediaPicker srcFile={memory.coverUrl} />

          <textarea
            defaultValue={memory.content}
            placeholder="Compartilhe sua memória, conte sobre seu momento e anexe uma imagem ou video"
            onChange={(e) => setContent(e.target.value)}
            className="h-40 w-full resize-none border-none bg-inherit"
          ></textarea>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="submit"
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          Atualizar
        </button>
        <button
          type="button"
          onClick={handleDeleteMemory}
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          Apagar memória
        </button>
      </div>
    </form>
  )
}
