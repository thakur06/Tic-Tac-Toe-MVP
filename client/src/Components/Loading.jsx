import React from 'react'
import load from "../assets/loader.gif"
export const Loading = () => {
  return (
    <div className='h-100 w-100 bg-[#FF4C4C]'>
        <img src={load} />
    </div>
  )
}
