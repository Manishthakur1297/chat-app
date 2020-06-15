import { axiosInstance } from "./service/axiosApi";

export const welcomeMessage = (socket) => {
    socket.on('welcomeMessage', msg =>{
        console.log(msg)
    });
    // socket.emit('message', "Message Received!");
    socket.on("typing", msg => {
        console.log(msg)
    })
}


export const getUsers = async () => {
    try {
        let res = await axiosInstance.get('/users/')
        // console.log(res)
        return res.data
    } catch (error) {
        throw error;
    }
}

// Get list of users conversations
export const getConversations = async () => {
    try {
        let res = await axiosInstance.get('/messages/conversations')
        console.log(res)
        return res.data
    } catch (error) {
        throw error;
    }
}

// get conversation messages based on
// to and from id's
export const getConversationMessages = async (id) => {
    try {
        let res = await axiosInstance.get(`/messages/conversations/query?id=${id}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        throw error;
    }
}


export const sendConversationMessage = async (id,body) => {
    try {
        let res = await axiosInstance.post('/messages/conversations/', {
            id: id,
            body: body
        })
        console.log(res)
        return res.data
    } catch (error) {
        throw error;
    }
}
