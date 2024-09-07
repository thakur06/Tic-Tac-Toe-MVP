"use client";
import React, { useState,useEffect } from "react";
import { Label } from "../Containers/Label";
import { Input } from "../Containers/Input";
import { cn } from "../Utils";
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import Cookie from "universal-cookie"
import { StreamChat } from "stream-chat";


export function Login({auth}) {
  const navigate=useNavigate();
  const cookie = new Cookie();
  const api_key = "95qwuk7e64q2";
  const client = StreamChat.getInstance(api_key);
  const token = cookie.get("token");


  
    if (token) {
      client.connectUser({
        id: cookie.get("uId"),
        Uname: cookie.get("Uname"),
        Fname: cookie.get("Fname"),
        Lname: cookie.get("Lname"),
        hashedPassword: cookie.get("hashedPassword")
      }, token).then(() =>{
        navigate("/home")
      });
    }
 

  
    const [name, setname] = useState("");
  const [password, setpassword] = useState("")
  const login = async() => {
    const headers = {
      'Content-Type': 'application/json',
    };
    await Axios.post("https://tic-tac-toe-mvp.vercel.app/login", {name,password }, { headers }).then(res => {
      console.log(res)
        cookie.set("token", res.data.token);
        cookie.set("Fname", res.data.Fname);
        cookie.set("Lname", res.data.Lname);
        cookie.set("Uname", res.data.Uname);
        cookie.set("uId", res.data.uId);
        cookie.set("hashedPassword", res.data.hashedPassword);
        navigate("/home")
    }
    ).catch(err => console.log(err));
}
const handleSubmit = (e) => {
    e.preventDefault();
    login();

};
  return (
    (<div
      className=" max-w-md w-full mx-auto rounded-lg  md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>
      <form className="my-8" onSubmit={handleSubmit}>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="king Slayer" type="text" func={setname} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" func={setpassword} />
        </LabelInputContainer>


        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit">
          Login &rarr;
          <BottomGradient />
        </button>

        <div
          className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />


      </form>
      
    </div>)
  );
}

const BottomGradient = () => {
  return (<>
    <span
      className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span
      className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>);
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};
