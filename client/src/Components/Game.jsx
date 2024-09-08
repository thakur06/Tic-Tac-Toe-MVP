import React, { useState, useEffect } from 'react';
import { Board } from './Board';
import { MessageList, MessageInput, Window } from 'stream-chat-react';
import { useChatContext } from 'stream-chat-react';
import { Result } from './Result';
import ninja from "../assets/ninja.png"
import Cookie from "universal-cookie"
export const Game = ({ channel, rival,logout,quit }) => {
  const { client } = useChatContext();
  const [players, setplayers] = useState(channel.state.watcher_count === 2);
  const [result, setresult] = useState({ player: '', status: '' });
  const [turn, setturn] = useState("X");
  const cookie = new Cookie();

  useEffect(() => {
    channel.on('user.watching.start', (e) => {
      setplayers(e.watcher_count === 2);
    });
  }, []);

  return (
    <div className="h-full w-full ">

      {players ? (
        <div className='flex flex-col h-full xxs:mt-[-5rem]  w-full md:mt-[-10rem]'>
          {result.status === "" ? (<>
            <h1 className='w-full text-center text-3xl capitalize font-bold text-red-700 md:mt-[2rem]'>{cookie.get("Fname")}</h1>
            <h1 className='w-full text-center text-2xl capitalize font-bold p-3 text-blue-700 animate-pulse'>{turn} is playing...</h1>
            <div className='flex md:flex-row xxs:flex-col gap-6 w-full justify-center items-center'>


              <Board result={result} setter={setresult} rival={rival} turn={turn} setturn={setturn}/>
              <div className='xxs:mt-1 mt-[7rem] text-pink-950 text-2xl'>
                <Window  >
                  <MessageList
                    disableDateSeparator
                    closeReactionSelectorOnClick
                    hideDeletedMessages
                    messageActions={["react"]}

                  />
                  <MessageInput noFiles />
                </Window>
                <div className='flex flex-row text-white gap-6 text-xl'>
                  <button onClick={()=>{quit();logout}} className="px-8 py-2 mb-5 border border-black bg-transparent font-semibold relative group transition duration-200">
  <div className="absolute -bottom-2 -right-2 bg-pink-800 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 text-white transition-all duration-200" />
  <span className="relative">
   Logout
  </span>
</button>
<button onClick={quit} className="px-8 py-2 mb-5 border border-black bg-transparent font-semibold relative group transition duration-200">
  <div className="absolute -bottom-2 -right-2 bg-pink-800 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 text-white transition-all duration-200" />
  <span className="relative">
  Leave Game
  </span>
</button>
                </div>
                
              
              </div>
            </div>
            </>
          ) : (
            <Result setter={setresult} result={result} quit={quit}/>

          )}
        </div>
      ) : (
        <div className='h-full w-full mx-auto animate-bounce my-auto '>
          <img src={ninja} className='h-72 w-72 mx-auto '/>
          <h1 className='text-5xl text-center font-rye animate-pulse text-red-600'>Waiting for <span className='capitalize text-red-800 font-extrabold'>{rival}</span> to Join...</h1>
        </div>
      )}
    </div>
  );
};