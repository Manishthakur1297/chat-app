import React, { Component } from 'react';
import { axiosInstance }  from "../service/axiosApi";

const ChatItem = ({users, userClicked}) => {

    const clickItem = user => evt => {
        userClicked(user);
    }
    return (
        <div>
            { 
                users.map( user => {
                    return <div onClick={clickItem(user)} key={user._id} className="user-item">
                        Username : {user.name}<br />
                    </div>

                })
            }
        </div>

    )
}

export default ChatItem;