
import { useState, useEffect } from 'react'
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

import { JoinGame } from '../Components/JoinGame'
import Cookie from "universal-cookie"

import { useNavigate } from "react-router-dom"
export const Home = () => {
  const [isAuth, setisAuth] = useState(false);
  const cookie = new Cookie();
  const api_key = "95qwuk7e64q2";
  const client = StreamChat.getInstance(api_key);
  const token = cookie.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      client.connectUser({
        id: cookie.get("uId"),
        Uname: cookie.get("Uname"),
        Fname: cookie.get("Fname"),
        Lname: cookie.get("Lname"),
        hashedPassword: cookie.get("hashedPassword")
        
      }, token).then(() => {setisAuth(true)});
    }else{
      navigate("/")
    }
  }, [token]);

  const logOut = async() => {
    console.log("logout")
    cookie.remove("token");
    cookie.remove("Fname");
    cookie.remove("Lname");
    cookie.remove("Uname");
    cookie.remove("hashedPassword");
    cookie.remove("uId");

    await client.disconnectUser();
    navigate("/")
  }
  return (
    <div><Chat client={client}><JoinGame logout={logOut}/></Chat>
    </div>
  )
}
