import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'

const Navuser = () => {
  return (
    <div>
        <Nav/>
        <main className='h-full px-3 mt-2 mx-auto'>
        <Outlet/>
        </main>
    </div>
  )
}

export default Navuser