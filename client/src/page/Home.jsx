import React from 'react'
import Left from '../components/left/Left'
import Right from '../components/right/Right'
import Navbar from '../components/Navbar'


function Home() {
  return (
    <div className='overflow-hidden bg-indigo-50'>
        <Navbar/>
        <div className='flex'>
        <Left />
        <Right />
        </div>
    </div>
  )
}

export default Home