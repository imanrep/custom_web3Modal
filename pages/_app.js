import '../styles/globals.css'
import Layout from '../comps/Layout'
import { useState } from 'react'
function MyApp(p) {
  const [address, setAddress] = useState()

  const {Component} = p

  p = {
    address,
    setAddress
  }
  return (
    <Layout {...p}>
      <Component/>
    </Layout>
  )
}

export default MyApp
