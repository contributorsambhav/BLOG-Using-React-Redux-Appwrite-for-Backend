import React from 'react'
import logo from './logo.jpg'
function Logo({width = '100px'}) {
  return (
    <div className='h-10 ' >
      <img className = "rounded-3xl h-[100%]" src={logo} alt="" />
    </div>
  )
}

export default Logo