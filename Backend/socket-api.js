// const express = require('express')
// const http = require('http')
// const socketio = require('socket.io')

// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

//Socket Listener
const message = "Welcome to Chat IO!"

const socketConnection = (io) => {
        io.on('connection', (socket) => {
        console.log("New Broadcast Connection")
        
        socket.emit("welcomeMessage", message)

        socket.on("message", msg => {
            console.log(msg)
        })
        socket.on("input", data => {
            console.log(data)
        })

    })

}

module.exports = socketConnection