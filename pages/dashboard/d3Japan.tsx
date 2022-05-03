import React, { useState } from 'react'
import { Layout } from '../../components/layout/Layout'
import JapanMap from '../../components/d3/JapanMap'

const d3Japan = () => {
  return (
    <Layout>
      <div className="container">
        <a href="https://zenn.dev/ignorant_kenji/articles/76dab0a748516470452b">
          <span className="text-3xl text-blue-500">reactとd3.js</span>
        </a>
        <div>
          <h2 className="label">日本地図</h2>
          <JapanMap />
        </div>
      </div>
    </Layout>
  )
}

export default d3Japan
