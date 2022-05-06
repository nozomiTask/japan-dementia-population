import React, { useState } from 'react'
import { Layout } from '../../components/layout/Layout'
import JapanMap from '../../components/d3/JapanMap'
import JapanMap01 from '../../components/d3/JapanMap01'

const D3Japan01 = () => {
  return (
    <Layout>
      <div className="container">
        <a href="https://zenn.dev/ignorant_kenji/articles/76dab0a748516470452b">
          <span className="text-3xl text-blue-500">reactとd3.js</span>
        </a>
        <div>
          <h2 className="label">日本地図01</h2>
          <JapanMap01 />
        </div>
      </div>
    </Layout>
  )
}

export default D3Japan01
