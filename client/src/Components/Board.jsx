import React, { useState,useEffect } from 'react'
import { Square } from './Square'
import { Patterns } from '../GamePattern';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
export const Board = ({result,setter,rival}) => {
  const [board, setboard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setplayer] = useState("X");
  const [turn, setturn] = useState("X");
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
const [pname, setpname] = useState("")

  const play = async (idx) => {
    if (board[idx] === "" && turn == player) {
      
      turn === "X" ? setturn("O") : setturn("X");
     
const name=client._user.Uname;
      await channel.sendEvent({
        type: "turn",
        data: { idx, player,name}
      })

      setboard(board.map((data, index) => {
        if (idx === index && data === "") {
          return player
        } else {
          return data;
        }

      }))
    }
  }
  const win = () => {
    Patterns.forEach(pattern => {
      const p1 = board[pattern[0]];
      if (p1 === "") return
      let winner = true;
      pattern.forEach(idx => {
        if (board[idx] != p1) {
          winner = false
        }
      })

      if (winner){
        
        setter({player:board[pattern[0]],status:"winner"});
      }
    })
  }

  const tie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setter({player:"None",status:"tie"});
    }
  };

  useEffect(() => {

  tie();
  win();

  }, [board])
  
  channel.on((event) => {

    if (event.type === "turn" && event.user.id != client.userID) {
      const who = event.data.player === "X" ? "O" : "X";
      setplayer(who);
      setturn(who);
      
      setpname(event.data.name);
      
      setboard(board.map((data, index) => {
        if (event.data.idx === index && data === "") {
          return event.data.player
        } else {
          return data;
        }

      }))
    }
  })

  return (
    <div className='flex flex-col justify-center items-center xxs:mx-auto md:mx-52'>
      <div className='flex flex-row justify-center items-center'>
        <Square clsx={"border-b-sky-200 border-b border-r border-r-sky-200"} val={board[0]} play={() => { play(0) }} />
        <Square clsx={"border-b-sky-200 border-b border-r border-r-sky-200"} val={board[1]} play={() => { play(1) }} />
        <Square clsx={"border-b-sky-200 border-b "} val={board[2]} play={() => { play(2) }} />

      </div>
      <div className='flex flex-row justify-center items-center'>
        <Square clsx={"border-b-sky-200 border-t-sky-200 border-b  border-t border-r border-r-sky-200"} val={board[3]} play={() => { play(3) }} />
        <Square clsx={"border-b-sky-200 border-t-sky-200 border-b  border-t border-r border-r-sky-200"} val={board[4]} play={() => { play(4) }} />
        <Square clsx={"border-b-sky-200 border-t-sky-200 border-b  border-t "} val={board[5]} play={() => { play(5) }} />
      </div><div className='flex flex-row justify-center items-center'>
        <Square clsx={"border-t-sky-200 border-t  border-r border-r-sky-200 "} val={board[6]} play={() => { play(6) }} />
        <Square clsx={"border-t-sky-200 border-t  border-r border-r-sky-200 "} val={board[7]} play={() => { play(7) }} />
        <Square clsx={"border-t-sky-200 border-t   "} val={board[8]} play={() => { play(8) }} />
      </div>
    </div>
  )
}
