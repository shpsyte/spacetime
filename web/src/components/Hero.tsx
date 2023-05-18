import Image from 'next/image'
import React from 'react'
import logo from '../assets/logo.svg'

export default function Hero() {
  return (
    <div className="space-y-5">
      <Image src={logo} alt="logo" quality={20} />
      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua capsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <a
        className="inline-block rounded-full bg-gray-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        href=""
      >
        Cadastrar lembranca
      </a>
    </div>
  )
}
