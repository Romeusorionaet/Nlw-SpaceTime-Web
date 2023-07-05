'use client'

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'
interface MediaPickerProp {
  srcFile?: string | null
}

export function MediaPicker({ srcFile }: MediaPickerProp) {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }
    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        onChange={onFileSelected}
        id="media"
        name="coverUrl"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview ? (
        <Image
          src={preview}
          width={550}
          height={200}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : (
        srcFile && (
          <Image
            src={srcFile}
            width={550}
            height={200}
            alt=""
            className="aspect-video w-full rounded-lg object-cover"
          />
        )
      )}
    </>
  )
}
