import React, { useState, useEffect } from 'react';
import { Board } from './Board';
import { MessageList, MessageInput, Window } from 'stream-chat-react';
import { useChatContext } from 'stream-chat-react';
import { Result } from './Result';
import load from "../assets/waiting.gif"

export const Game = ({ channel, rival,logout }) => {
  const { client } = useChatContext();
  const [players, setplayers] = useState(channel.state.watcher_count === 2);
  const [result, setresult] = useState({ player: '', status: '' });


  async function deleteAllMessages(channelId) {
    const channel = client.channel('messaging', channelId); // Specify the channel type and ID

    // Fetch all messages
    let messages = [];
    let hasMore = true;
    let lastMessageId = null;

    while (hasMore) {
      const response = await channel.query({
        messages: { limit: 100, id_lt: lastMessageId }, // Fetch in batches
      });

      messages = response.messages;
      hasMore = messages.length > 0;

      // Delete each message
      for (const message of messages) {
        await channel.deleteMessage(message.id);
      }

      // Set the last message ID for the next batch
      lastMessageId = messages[messages.length - 1]?.id;
    }
  }


  const channelId = channel.cid;
  const destroy = async () => {
   
    deleteAllMessages(channelId);
  } // Hard delete

  useEffect(() => {
    channel.on('user.watching.start', (e) => {
      setplayers(e.watcher_count === 2);
    });
  }, []);

  return (
    <div className="h-full w-full">
      {players ? (
        <div className='flex flex-col h-full w-full'>
          {result.status === "" ? (
            <div className='flex md:flex-row xxs:flex-col'>
              <Board result={result} setter={setresult} rival={rival} />
              <div className='h-96 w-32'>
                <Window  >
                  <MessageList
                    disableDateSeparator
                    closeReactionSelectorOnClick
                    hideDeletedMessages
                    messageActions={["react"]}

                  />
                  <MessageInput noFiles />
                </Window>
                <button className='' onClick={() => destroy()}>Left game</button>
                <button className='' onClick={logout}>Left game</button>
              </div>
            </div>
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