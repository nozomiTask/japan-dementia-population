import Link from 'next/link'

export const Layout = (props) => {
  const { children, title = 'タイトル' } = props

  return (
    <div className="flex flex-col min-h-screen">
      <header className="justify-around bg-gray-300 h-24 md:h-12 flex">
        <div className="flex items-center justify-round">
          <Link href="/dashboard/initPage">
            <a className="text-xl hover:opacity-30">ホーム</a>
          </Link>
        </div>
        <div className="items-center justify-between flex text-sm md:text-lg">
          <div className="ml-6 text-sm text-mono"></div>
        </div>
      </header>
      <main className="flex-grow ml-10">{children}</main>

      <footer className="bg-gray-200">
        <p className="p-2 text-center text-xs">
          Copyright © nozomi memory clinic, Apr. 2022. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}