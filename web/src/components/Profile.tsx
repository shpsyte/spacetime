import { getUser } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Profile() {
  const { name, avatarUrl } = getUser()
  return (
    <div className="flex items-center gap-3 text-left ">
      <Image
        src={avatarUrl}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-xs text-purple-500 hover:text-purple-400"
        >
          Logout
        </a>
      </p>
    </div>
  )
}
