import Link from 'next/link'
import React from 'react'

export default function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        You dont have any memories yet. Start creating{' '}
        <Link className="underline hover:text-gray-50" href="/memories/new">
          one now
        </Link>
      </p>
    </div>
  )
}
