import React, { Component } from 'react';
import { axiosInstance }  from "../service/axiosApi";

const UserItem = ({users, userClicked, usr}) => {

    const clickItem = user => evt => {
        userClicked(user);
    }
    return (
        <div className="row">
            { 
                users.map( (user,idx) => {
                    
                    return <div onClick={clickItem(user)} key={user._id} className="user-item">
                        {user.name} <span style={{color:"red",fontSize:"12px"}}>{user.email===usr ? " is typing..." : ""}</span>
                        <br />
                    </div>

                })
            }
        </div>

    )
}

// if(messages.length === index+1){
//     return  <div ref={messagesEnd}>messagesComp(item)</div>    
//  }else{
//      messagesComp(item)
//  }

export default UserItem;