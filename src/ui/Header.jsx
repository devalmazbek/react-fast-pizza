import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../features/order/Search'
import User from '../features/users/User'

export default function Header() {
  return (
    <header className='flex items-center justify-between bg-yellow-500 uppercase border-b border-stone-200 px-4 py-3'>
        <Link to='/' className='tracking-widest'>Fast React Pizza Co.</Link>
        <Search />
        <User />
    </header>
  )
}
