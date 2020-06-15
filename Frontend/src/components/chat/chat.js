import React, { useState, useEffect, Fragment, useRef } from 'react';
import { welcomeMessage, getUsers, sendConversationMessage,
  getConversationMessages, getConversations } from '../apiCore';
import io from "socket.io-client";

import ChatItem from './chatItem';
import UserItem from './userItem';

import { ChatList } from "react-chat-elements";

import { Container, Row, Col } from  'react-bootstrap';

const Chat = () => {

  const admin = localStorage.getItem("user")

  const SOCKET_URI = process.env.REACT_APP_SERVER_URI;

  const socket = io.connect(SOCKET_URI)

  const [message, setMessage] = useState("")

  const [users, setUsers] = useState([])
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null)

  const [lastMessage, setLastMessage] = useState(null);
  const [typingUser, setTypingUser] = useState("");
  
  let chatBottom = useRef(null);

const scrollToBottom = () => {
  if (chatBottom && chatBottom.current) {
      chatBottom.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
};

  const listUsers = () => {
    getUsers().then(data => {
        setUsers(data)
    });  
    }

  useEffect(() => {
    // welcomeMessage(socket)
    listUsers()
  },[typingUser])

  useEffect(() => {
    reloadMessages()
      scrollToBottom();
}, [lastMessage]);

useEffect(() => {
  // const socket = io.connect((process.env.REACT_APP_API_URL);
  socket.on('messages', data => setLastMessage(data));
  socket.on("typing", (usr) => {
    setTypingUser(usr)
  })
  socket.on("stopTyping", () => {
    setTypingUser("")
  })
}, []);

useEffect(scrollToBottom, [conversations]);

const reloadMessages = () => {
  if(user)
  {
    getConversationMessages(user._id).then((data)=>{
      setConversations(data)
    })

  }else {
      setConversations([]);
  }
};

  const inputChanged = event => {
    if(event.target.value.length>0)
    {
      socket.emit("typing", admin)
    }
    else
    {
      socket.emit("stopTyping")
    }
    setMessage(event.target.value)
}

  const sendMessage = (msg) => (e) => {
    e.preventDefault()
    if(msg.length===0){
      alert("Enter some message first...")
    }
    else{
      sendConversationMessage(user._id, msg)
      .then((res)=> {
        setMessage("")
        setTypingUser("")
      })
  }
}

  const userClicked = (user) => {
    console.log(user)
    setUser(user)
    getConversationMessages(user._id).then((data)=>{
      setConversations(data)
    })
  }

    return (

      <Container fluid>

        {users.length ? (
          
          <Row className="row-block">
            <Col xs={2} className="col-block-empty"/>
            <Col xs={2} className="col-block box-list">
                <p>Users List</p>
                <UserItem users={users} userClicked={userClicked} usr={typingUser}/>
            </Col>
            <Col xs={6} className="col-block wrapper">
              {user ? (
                
              <Fragment>
                
                <div className="title-bar">
                  {user.name}
                </div>
                <div className="box">
                
                  {conversations.length>0 ? (
                    <div ref={chatBottom}> 
                      <ChatItem conversations={conversations} user={user._id}/>
                      
                    </div>
                    
                    ) : "No Conversations yet" 
                    }
                </div>
                <div>
                    <form className="form-data">
                      <input className="form-input" id="m" value={message} onChange={inputChanged} />
                      <button className="form-button" onClick={sendMessage(message)}>Send</button>
                    </form>
                </div>
              </Fragment>
              ) : 
              (
                <div className="text-center no-users">Select User to Chat from left side bar</div>
              )}
            </Col>
            <Col xs={1} className="col-block-empty"/>
          </Row>
          
        ) : (
          <div className="text-center no-users">No users to show.</div>
        )}

      </Container>
    );
};

export default Chat;