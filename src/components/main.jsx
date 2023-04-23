import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => (
  <div>
    <h1>React Router 4</h1>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/topics'>Topics</Link>
    </nav>
  </div>
)

function HomePage() {
    return <div>Welcome to Next.js!</div>
  }
  
  export default HomePage