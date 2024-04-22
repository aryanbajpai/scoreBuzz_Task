import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className='flex justify-between items-center border-b-4   border-white py-3 px-10 bg-[#063b84] text-[#ffeaa6]'>
        <div>
            <h1 className='text-[36px] font-[700] hover:cursor-pointer'>
            <i><span>score</span><span className='text-yellow-400'>Buzz</span></i></h1>
        </div>
        <div className='flex gap-5'>
            <Link to={'/login'} className='text-[25px] font-semibold hover:text-yellow-400 hover:cursor-pointer'><i>LOGIN</i></Link>
            {/* <div className='text-[25px] font-semibold'><i>TWO</i></div> */}
        </div>
    </div>
  )
}
