import React, { useState, useEffect } from 'react';
import { Board } from './Board';
import { MessageList, MessageInput, Window } from 'stream-chat-react';
import { Result } from './Result';

export const Game = ({ channel, rival,destroy }) => {
  const [players, setplayers] = useState(channel.state.watcher_count === 2);
  const [result, setresult] = useState({ player: '', status: '' });

  useEffect(() => {
    channel.on('user.watching.start', (e) => {
      setplayers(e.watcher_count === 2);
    });
  }, []);

  return (
    <div className="h-full w-full">
      {players ? (
        <div>
          {result.status === "" ? (
            <div className='flex flex-row pr-28 pl-28'>
              <Board result={result} setter={setresult} rival={rival} />
              <div className='h-96 p-28 '>
              <Window  >
              {/* <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        /> */}
        <MessageInput noFiles />
              </Window>
              <button className='' onClick={()=>destroy()}>Left game</button>
</div>
            </div>
          ) : (
            <Result setter={setresult} result={result} />

          )}
        </div>
      ) : (
        <h1>Waiting for other players</h1>
      )}
    </div>
  );
};