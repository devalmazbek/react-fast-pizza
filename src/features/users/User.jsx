import React from 'react'
import { useSelector } from 'react-redux'

export default function User() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className='text-sm font-semibold'>{username}</div>
  )
}
