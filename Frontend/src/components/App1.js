import React, { useState, useEffect } from 'react';
import { welcomeMessage } from './apiCore';
import './App.css';
import io from "socket.io-client";

const App = () => {

  const SOCKET_URI = process.env.REACT_APP_SERVER_URI;

  const socket = io.connect(SOCKET_URI)

  const [message, setMessage] = useState("")


  useEffect(() => {
    welcomeMessage(socket)
  },[])

  const inputChanged = event => {
    setMessage(event.target.value)
}

  const sendMessage = (msg) => (e) => {
    socket.emit("message", msg)
    setMessage("")
  }

    return (

        <div>
            <input type="text" placeholder="Message" value={message} onChange={inputChanged} />
            <button onClick={sendMessage(message)}>Send</button>  

        </div>
    );
};

export default App;