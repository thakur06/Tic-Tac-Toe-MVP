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
        <div className='flex flex-col h-full  w-full'>
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
               
              
              </div>
            </div>
            </>
          ) : (
            <Result setter={setresult} result={result} />

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