import React from 'react'

export default function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        You dont have any memories yet. Start creating{' '}
        <a className="underline hover:text-gray-50" href="">
          one now
        </a>
      </p>
    </div>
  )
}
