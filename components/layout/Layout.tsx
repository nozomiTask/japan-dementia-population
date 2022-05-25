import Link from 'next/link'
import Image from 'next/image'
export const Layout = (props) => {
  const { children, title = 'タイトル' } = props

  return (
    <div className="flex flex-col w-[900px] bg-gray-100">
      <header className="justify-around bg-gray-200 h-24 md:h-12 flex">
        <Link href="https://www.nozomi-mem.jp/">
          <a className="flex justify-items-start text-xl hover:opacity-30">
            <Image
              src="/nozomi.png"
              alt="Nozomi_Memory_Clinic_Logo"
              width={40}
              height={40}
            />
            <span className="text-green-500 text-4xl">
              のぞみメモリークリニック
            </span>
          </a>
        </Link>

        <div className="items-center justify-between flex text-sm md:text-lg bg-color-gray-400">
          <Link href="https://www.nozomi-mem.jp/">
            <a className="ml-6 text-xl text-mono text-green-500">
              のぞみメモリークリニックのホームページへ
            </a>
          </Link>
        </div>
      </header>
      <main className="flex-grow ml-10 ">{children}</main>

      <footer className="bg-gray-200">
        <p className="p-2 text-center text-xs">
          <a href="https://www.nozomi-mem.jp/">
            Copyright © nozomi memory clinic, Apr. 2022. All Rights Reserved.
          </a>
        </p>
      </footer>
    </div>
  )
}
