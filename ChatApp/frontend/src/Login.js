


import React, { useState } from "react";
import io from 'socket.io-client'
import './Login.css';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Messages from "./Messages";
// import { Link } from 'react-router-dom';

const socket = io('http://localhost:7000');

function Login() {

    const [name, setName] = useState("");
    const [showChat, setShowchat] = useState(false);

    function joined() {
        setShowchat(true);
    };

    return (< >
        {!showChat ? (
          <div className="JoinPage">
            <div >
                <h1 className="JoinContainer"> Chat Login</h1>
                <input onChange={(e) => setName(e.target.value)} placeholder="your name" type="text" id="joinInput"></input>
                <div>
                   <button onClick={joined} className="joinbtn">Login</button> 
                </div>
            </div>
        </div>
        ) : (
            <Messages name={name} />
        )}
    </>
    )
};

export default Login;