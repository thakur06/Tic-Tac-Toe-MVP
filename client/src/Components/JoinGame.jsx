
"use client";
import { TypewriterEffectSmooth } from "../Containers/TextWrite";
import React, { useState } from 'react'
import { Label } from "../Containers/Label";
import { Input } from "../Containers/Input";
import { useChatContext,Channel } from 'stream-chat-react';
import { Background } from './Background';
import { Game } from './Game';
import { CustomMessageInput } from './CustInput';
import { TextWrite } from './TextWrite';
export const JoinGame = ({logout}) => {
    const [opponent, setopponent] = useState("");
    const {client} = useChatContext();
    const [channel, setchannel] = useState("");
    const words = [
        {
          text: "Enter",
        },
        
        {
          text: "your",
        },
    
        {
          text: "Opponent Name.",
          className: "text-red-700 dark:text-blue-500",
        },
      ];
    
const createChannel=async()=>{
    const rival=await client.queryUsers({ Uname: { $eq: opponent } });
    console.log(rival)
    if (rival.users.length ==0) { alert("User not found"); return; }

    const newChannel= client.channel("messaging",{members:[client.userID,rival.users[0].id ]});
    await newChannel.watch();
    setchannel(newChannel);
    console.log(newChannel.cid);
}
    return (
   <div className='mt-10'>
           {channel?<Channel channel={channel} Input={CustomMessageInput}> <Game channel={channel} logout={logout} rival={opponent} /></Channel>:<><div className="flex flex-col items-center justify-center   ">

<TypewriterEffectSmooth words={words} />
<div
  className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
    <Input id="Rivvall" placeholder="Furiosa" type="text" func={setopponent} />
  <button onClick={createChannel}
    className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
    Join Game
  </button>
  <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm" onClick={logout}>
          Logout
        </button>
</div>
</div>
           
            </>}
        </div>
    )
}
