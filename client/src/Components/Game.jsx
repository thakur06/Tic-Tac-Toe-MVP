import React, { useState, useEffect } from 'react';
import { Board } from './Board';
import { MessageList, MessageInput, Window } from 'stream-chat-react';
import { useChatContext } from 'stream-chat-react';
import { Result } from './Result';
import load from "../assets/waiting.gif"
import Cookie from "universal-cookie"
export const Game = ({ channel, rival,logout,quit }) => {
  const { client } = useChatContext();
  const [players, setplayers] = useState(channel.state.watcher_count === 2);
  const [result, setresult] = useState({ player: '', status: '' });

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
            <h1 className='w-full text-center text-xl xxs:-mt-24 md:-mt-[6rem]'>hi {cookie.get("Fname")}</h1>
            <div className='flex md:flex-row xxs:flex-col gap-6 w-full justify-center items-center'>


              <Board result={result} setter={setresult} rival={rival} />
              <div className='xxs:mt-1 mt-[7rem]'>
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
        <div className='h-full w-full bg-black'>
          <img src={load} />
          <h1>{rival}</h1>
        </div>
      )}
    </div>
  );
};