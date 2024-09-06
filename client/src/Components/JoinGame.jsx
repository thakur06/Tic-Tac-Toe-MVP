import React, { useState } from 'react'
import { Label } from "../Containers/Label";
import { Input } from "../Containers/Input";
import { useChatContext,Channel } from 'stream-chat-react';
import { Background } from './Background';
import { Game } from './Game';
import { CustomMessageInput } from './CustInput';
export const JoinGame = () => {
    const [opponent, setopponent] = useState("");
    const {client} = useChatContext();
    const [channel, setchannel] = useState("")
    const destroy =async ()=> await channel.delete();
const createChannel=async()=>{
    const rival=await client.queryUsers({ Uname: { $eq: opponent } });
    console.log(rival)
    if (rival.users.length ==0) { alert("User not found"); return; }

    const newChannel= client.channel("messaging",{members:[client.userID,rival.users[0].id ]});
    await newChannel.watch();
    setchannel(newChannel)
}
    return (
   <>
           {channel?<Channel channel={channel} Input={CustomMessageInput}> <Game channel={channel}  rival={opponent} destroy={destroy}/></Channel>:<><Label htmlFor="Rival">Rival</Label>
            <Input id="Rivvall" placeholder="Furiosa" type="text" func={setopponent} />
            <button onClick={createChannel}>Join Game</button></>}
        </>
    )
}
