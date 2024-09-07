import { useEffect } from "react"
import React from 'react'
import win from "../Utils/win1.mp3"
import tie from "../Utils/lose1.mp3"
import winner from "../assets/winner.png"
export const Result = ({setter,result}) => {
    // useEffect(() => {
    //     console.log(result)
    //   result.status==="winner"?new Audio(win).play():new Audio(tie).play()
    // }, [])
    
  return (
    <div className="flex flex-col justify-center items-center">
<img src={winner}  className="h-80 w-80"/>
<h1 className="font-display text-red-600 text-4xl animate-bounce"><span className="text-red-700 text-7xl animate-pulse">{result.player}</span> won the game</h1>
<button onClick={()=>setter({ player: '', status: '' })} className="px-8 py-2 border border-black bg-transparent font-semibold relative group transition duration-200">
  <div className="absolute -bottom-2 -right-2 bg-pink-800 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 text-white transition-all duration-200" />
  <span className="relative">
   Restart Game
  </span>
</button>
    </div>
  )
}
