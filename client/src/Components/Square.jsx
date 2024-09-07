import React from 'react'

export const Square = ({val,play,clsx}) => {
  return (
    <div className={` ${clsx}  text-center xxs:h-[5rem] xxs:w-[5rem] sm:h-[8rem] md:w-[8rem] flex justify-center items-center bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent `} onClick={play}>{val}</div>
  )
}
