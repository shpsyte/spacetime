import EmptyMemories from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayJs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
type MemoryType = {
  coverUrl: string
  excertp: string
  id: string
  createdAt: string
}
export default async function Home() {
  const isAutenticate = cookies().has('token')

  if (!isAutenticate) {
    return (
      <>
        <EmptyMemories />
      </>
    )
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: MemoryType[] = response.data

  console.log(memories)

  if (memories.length === 0) {
    return (
      <>
        <EmptyMemories />
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-10 p-8">
        {memories.map((memory) => {
          return (
            <div key={memory.id} className="space-y-4">
              <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                {dayJs(memory.createdAt).format('D[ de ] MMM, YYYY')}
              </time>
              <Image
                className="aspect-video w-full rounded-lg object-cover"
                src={memory.coverUrl}
                alt={memory.excertp}
                width={592}
                height={280}
              />
              <p className="text-lg leading-relaxed text-gray-100">
                {memory.excertp}
              </p>
              <Link
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
                href={`/memories/id/${memory.id}`}
              >
                Ler Mais
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
