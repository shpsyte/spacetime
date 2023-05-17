export default function Home() {
  return (
    <>
      <main className="grid min-h-screen grid-cols-2">
        {/* Left side */}
        <div className="relative flex flex-col items-start justify-between overflow-hidden px-28 py-16">
          <div className="blur-full absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50" />
        </div>

        {/* Right side */}
        <div className="flex flex-col p-16">
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
