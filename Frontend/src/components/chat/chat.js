import React, { useState, useEffect } from 'react';
import { welcomeMessage, getUsers } from '../apiCore';
import io from "socket.io-client";

import ChatItem from './chatItem';

import { ChatList } from "react-chat-elements";

import { Container, Row, Col } from  'react-bootstrap';

const Chat = ({user}) => {

  const SOCKET_URI = process.env.REACT_APP_SERVER_URI;

  const socket = io.connect(SOCKET_URI)

  const [message, setMessage] = useState("")

  const [users, setUsers] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const listUsers = () => {
    
    getUsers().then(data => {
        console.log(data)
        setUsers(data)
    });
     
    }

  useEffect(() => {
    // welcomeMessage(socket)
    listUsers()
  },[])


  const inputChanged = event => {
    setMessage(event.target.value)
}

  const sendMessage = (msg) => (e) => {
    socket.emit("message", msg)
    setMessage("")
  }

  const userClicked = (user) => {
    console.log(user)
  }

    return (

      <Container fluid>

        {users.length ? (
          
          <Row className="row-block">
            <Col xs={3} className="col-block">
                <ChatItem users={users} userClicked={userClicked}/>
            </Col>
            <Col xs={8} className="col-block">
              <p></p>
              <form action="">
                <input id="m"  /><button>Send</button>
              </form>
            </Col>
          </Row>
          
        ) : (
          <div className="text-center no-users">No users to show.</div>
        )}

      </Container>
    );
};

export default Chat;