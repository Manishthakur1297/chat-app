import React, { Component } from 'react';
import { axiosInstance }  from "../service/axiosApi";


const ChatItem = ({conversations, user}) => {

    return (
        
        <div className="message">
            {
                conversations.map( conversation => {
                    const isSender = conversation.from===user
                    return <div key={conversation._id} className="clear" >
                        <p className={isSender ? "message-left" : "message-right"}>
                            {conversation.body}
                        </p>
                    </div>

                })
            }
        </div>

    )
}

export default ChatItem;