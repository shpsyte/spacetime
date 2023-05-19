'use client'

import { ChangeEvent, useState } from 'react'

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isImg, setIsImg] = useState<boolean>(true)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    const preview = URL.createObjectURL(files[0])

    const isImgage = files[0].type.includes('image')

    setIsImg(isImgage)
    setPreview(preview)
  }
  return (
    <>
      <input
        type="file"
        id="media"
        name="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
      />

      {!!preview && isImg && (
        <img
          src={preview}
          alt="preview"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
      {!!preview && !isImg && (
        <video
          src={preview}
          controls
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
