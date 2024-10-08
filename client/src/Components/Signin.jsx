"use client";
import React, { useState } from "react";
import { Label } from "../Containers/Label";
import { Input } from "../Containers/Input";
import { cn } from "../Utils";
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import Cookie from "universal-cookie"

export function Signin() {
    
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [Uname, setUname] = useState("")
    const [password, setpassword] = useState("")
    const navigate=useNavigate();
    const cookie = new Cookie();

    const signin = async() => {
        await Axios.post("https://tic-tac-toe-mvp.vercel.app/signin", { Fname, Lname, Uname, password }).then(res => {
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
        signin();
    };
    return (
        (<div
            className="max-w-md text-center w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8  bg-transparent text-slate-200">
            <h2 className="font-bold text-xl text-pink-950">
                Tic Tac Toe -MVP
            </h2>
            <p className="text-sm max-w-sm mt-2 text-pink-900">
                Create you account now & start playing now
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
                <div
                    className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname" className="text-pink-800">First name</Label>
                        <Input id="firstname" placeholder="Tyler" type="text" func={setFname} />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname" className="text-pink-800">Last name</Label>
                        <Input id="lastname" placeholder="Durden" type="text" func={setLname} />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="username" className="text-pink-800">Username</Label>
                    <Input id="username" placeholder="KingSlayer" type="text" func={setUname} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password" className="text-pink-800">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" func={setpassword} />
                </LabelInputContainer>


                <button
                    className="border border-pink-950 bg-pink-800 w-full text-white rounded-md h-10 font-medium"
                    type="submit">
                    Sign up &rarr;
                    <BottomGradient />
                </button>

                <div
                    className="bg-gradient-to-r from-transparent via-teal-600 to-emerald-300 my-8 h-[1px] w-full" />


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
