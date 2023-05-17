import { User } from 'lucide-react'
import logo from '../assets/logo.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main className="grid min-h-screen grid-cols-2">
        {/* Left side */}
        <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] px-28 py-16">
          {/* Blur */}
          <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

          {/* Stripes */}
          <div className="absolute right-2 top-0 h-full w-2  bg-stripes" />

          <a
            href=""
            className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
              <User className="h-5 w-5 text-gray-500" />
            </div>

            <p className="max-w-[140px] text-sm leading-snug">
              <span className="underline">Crie sua conta</span> e salve suas
              memorias
            </p>
          </a>

          {/* Hero */}
          <div className="space-y-5">
            <Image src={logo} alt="logo" quality={20} />
            <div className="max-w-[420px] space-y-1">
              <h1 className="text-5xl font-bold leading-tight text-gray-50">
                Sua capsula do tempo
              </h1>
              <p className="text-lg leading-relaxed">
                Colecione momentos marcantes da sua jornada e compartilhe (se
                quiser) com o mundo!
              </p>
            </div>
            <a
              className="inline-block rounded-full bg-gray-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
              href=""
            >
              Cadastrar lembranca
            </a>
          </div>

          {/* Copy */}
          <div className="text-sm leading-relaxed text-gray-200">
            Feito com amor no NLW{' '}
            <a target="_blank" rel="noreferral" href="">
              #5
            </a>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
          <div className="flex flex-1 items-center justify-center">
            <p className="w-[360px] text-center leading-relaxed">
              You dont have any memories yet. Start creating{' '}
              <a className="underline hover:text-gray-50" href="">
                one now
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
