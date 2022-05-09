import Link from 'next/link'
import React from 'react'
import { Layout } from '../../../components/layout/Layout'

const courceraInitPage = () => {
  return (
    <Layout>
      <div className="bg-gray-100 pr-4 py-4 my-4 flex justify-start container">
        <Link href="/dashboard/courcera/brush">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            Brush & zoom
          </a>
        </Link>
                <Link href="/dashboard/courcera/toolTips">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            toolTips
          </a>
        </Link>
        <Link href="/dashboard/courcera/d3Courcera">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3Courcera
          </a>
        </Link>
        <Link href="/dashboard/courcera/d3Courcera01">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3Courcera01
          </a>
        </Link>
        <Link href="/dashboard/courcera/d3Courcera02">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3Courcera02
          </a>
        </Link>
        <Link href="/dashboard/courcera/d3CourceraAssignment">
          <a className="ml-6 p-2 text-xl rounded hover:opacity-50 bg-gray-50 text-gray-700 shadow-lg">
            d3CourceraAssignment
          </a>
        </Link>
      </div>
    </Layout>
  )
}
export default courceraInitPage
