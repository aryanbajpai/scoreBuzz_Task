import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <div>
        <div className='border-2 border-white w-[500px] m-auto mt-20 p-5 rounded-xl '>
            <h1 className='text-[35px] font-[600] text-center my-1 text-blue-800'>Continue as :</h1>
            <div className='h-[1px] bg-blue-800'></div>
            <div className='mt-4 flex gap-3 justify-center'>
                <Link to={'/logscorer'}>
                  <div className='text-lg bg-white text-blue-600 font-[500] px-3 py-1 hover:text-white hover:bg-blue-600 rounded-lg'>Scorer</div>
                </Link>
                <Link to={'/logviewer'}>
                  <div className='text-lg bg-white text-blue-600 font-[500] px-3 py-1 hover:text-white hover:bg-blue-600 rounded-lg'>Viewer</div>
                </Link>
            </div>
        </div>
    </div>
  )
}
