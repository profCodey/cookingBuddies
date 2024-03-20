'use client'

import { useState } from "react";
import axios from "axios"

export default function Register() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");  
    const [confirmPassword, setConfirmPassword] = useState("");

    const registerEndpoint = "http://localhost:8000/api/auth/register";

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("submitted");
        console.log(firstName,  lastName, email, userName, password, confirmPassword);
        const data = {
          firstName, lastName, email, userName, password, confirmPassword
        };

        const response = await axios.post(registerEndpoint, data);
        
        console.log("this is the response", response);
}
    return (
      <div className="">
        <form onSubmit={(e)=> handleSubmit(e)}>
          <div className="">
            <label>
              {" "}
              First Name
              <input
                type="text"
                className="rounded-2xl border-blue-500"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              ></input>
            </label>
          </div>
          <div className="">
            <label>
              {" "}
              Last Name
              <input
                type="text"
                className="rounded-2xl border-blue-500"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              ></input>
            </label>
          </div>
          <div className="">
            <label>
              {" "}
              Email
              <input
                type="email"
                className="rounded-2xl border-blue-500"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              ></input>
            </label>
          </div>
          <div className="">
            <label>
              {" "}
              Username
              <input
                type="text"
                className="rounded-2xl border-blue-500"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
              ></input>
            </label>
          </div>
          <div className="">
            <label>
              {" "}
              Password
              <input
                type="text"
                className="rounded-2xl border-blue-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              ></input>
            </label>
          </div>
          <div className="">
            <label>
              {" "}
              Confirm Password
              <input
                type="text"
                className="rounded-2xl border-blue-500"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              ></input>
                    </label>
                    
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white rounded-2xl" >
                        Register
                    </button>
                </div>
        </form>
      </div>
    );
}
