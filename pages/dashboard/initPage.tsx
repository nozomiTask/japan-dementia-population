import Link from 'next/link'
import React from 'react'
import LineChart from '../../components/d3/PieChart'
import { Layout } from '../../components/layout/Layout'

const InitPage = () => {
  return (
    <Layout>
      <div className="bg-gray-100 pr-4 py-4 my-4 flex justify-start">
        <Link href="/dashboard/d3test">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3 test
          </a>
        </Link>
        <Link href="/dashboard/d3Japan">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3 日本地図
          </a>
        </Link>
        <Link href="/dashboard/d3Japan01">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3 日本地図　01
          </a>
        </Link>
        <Link href="/dashboard/d3Courcera">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3 Courcera
          </a>
        </Link>
        <Link href="/dashboard/d3CourceraAssignment">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3 Courcera Assignment
          </a>
        </Link>
        <Link href="/dashboard/d3Bar">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3　棒グラフ
          </a>
        </Link>
        <Link href="/dashboard/d3LineChart">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3　線グラフ
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default InitPage
