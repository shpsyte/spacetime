'use client'

import { Camera } from 'lucide-react'
import React, { FormEvent } from 'react'
import MediaPicker from './MediaPicker'
import { api } from '@/lib/api'

export default function NewMemoryForms() {
  async function handleCreatememory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpdate = formData.get('media')
    let imrUrl = ''
    if (fileToUpdate) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpdate)

      const upload = await api.post('/upload', uploadFormData)
      imrUrl = upload.data.fileUrl
    }

    await api.post('/memories', {
      coverUrl: imrUrl,
      content: formData.get('content'),
      isPublic: formData.get('isPublic'),
    })
  }
  return (
    <>
      <form
        className="flex flex-1 flex-col gap-2"
        onSubmit={handleCreatememory}
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <Camera className="h4 w-4" />
            Anexar Midia
          </label>
          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            Publica?
          </label>
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 "
          />
          Tornar publico
        </div>

        <MediaPicker />

        <textarea
          name="content"
          spellCheck={false}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar sua memoria aqui..."
        />

        <button
          type="submit"
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        >
          Salvar
        </button>
      </form>
    </>
  )
}
