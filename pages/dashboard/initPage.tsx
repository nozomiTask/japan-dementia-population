import Link from 'next/link'
import React from 'react'
import { Layout } from '../../components/layout/Layout'

const InitPage = () => {
  return (
    <Layout>
      <div className="bg-gray-100 pr-4 py-4 my-4 flex justify-start">
        <Link href="/dashboard/d3Japan">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            日本地図
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default InitPage
