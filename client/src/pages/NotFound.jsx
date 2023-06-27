import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <h1>404 NotFound</h1>
      <Link to={'/login'}>Back</Link>
    </>
  )
}

export default NotFound