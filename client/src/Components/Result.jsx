import { useEffect } from "react"
import React from 'react'
import win from "../Utils/win1.mp3"
import tie from "../Utils/lose1.mp3"
export const Result = ({setter,result}) => {
    useEffect(() => {
        console.log(result)
      result.status==="winner"?new Audio(win).play():new Audio(tie).play()
    }, [])
    
  return (
    <div>

        <button onClick={()=>setter({ player: '', status: '' })} >Start new game</button>
    </div>
  )
}
