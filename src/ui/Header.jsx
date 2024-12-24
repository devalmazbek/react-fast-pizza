import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../features/order/Search'

export default function Header() {
  return (
    <header className='bg-yellow-500'>
        <Link to='/'>Fast React Pizza Co.</Link>
        <Search />
        <p>Pizza Fast</p>
    </header>
  )
}
