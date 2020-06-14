import { axiosInstance } from "./service/axiosApi";

export const welcomeMessage = (socket) => {
    socket.on('welcomeMessage', msg =>{
        console.log(msg)
    });
    socket.emit('message', "Message Received!");
}


export const getUsers = async () => {
    try {
        let res = await axiosInstance.get('/users/')
        console.log(res)
        return res.data
    } catch (error) {
        throw error;
    }
}