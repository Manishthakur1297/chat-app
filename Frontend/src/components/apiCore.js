
export const welcomeMessage = (socket) => {
    socket.on('welcomeMessage', msg =>{
        console.log(msg)
    });
    socket.emit('message', "Message Received!");
}

export const getProducts = sortBy => {
    return fetch(`/api/products?sortBy=${sortBy}&order=desc&limit=12`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};