import { ReactNode } from 'react'
import './globals.css'
// Flex will adaptivy among screens
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamJuree,
} from 'next/font/google'
import Hero from '@/components/Hero'
import Profile from '@/components/Profile'
import Sigin from '@/components/Sigin'
import Copyright from '@/components/Copyright'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamJuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'NLW Spacetime - Save the planet',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAutenticate = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* Left side */}
          <div className="relative flex  flex-col items-start justify-between  overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] px-28 py-16">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            {/* Stripes */}
            <div className="absolute right-2 top-0 h-full w-2  bg-stripes" />
            {isAutenticate ? <Profile /> : <Sigin />}

            <Hero />
            <Copyright />
          </div>

          {/* Right side */}
          <div className=" flex max-h-screen flex-col overflow-y-auto bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
