import React from 'react'

export const Square = ({val,play,clsx}) => {
  return (
    <div className={` ${clsx}  text-center ${val=="X"?"text-blue-700":"text-amber-600"}  h-[8rem] w-[8rem] xxs:[3rem] xxs:[3rem] flex justify-center items-center bg-clip-text text-6xl font-extrabold`} onClick={play}>{val}</div>
  )
}
