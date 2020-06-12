// const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const cors = require("cors");

app.use(cors());

const port = process.env.PORT || 3000
// const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

const message = "Welcome to Chat IO!"

io.on('connection', (client) => {
    console.log("New Broadcast Connection")

    client.emit("welcomeMessage", message)
    client.on("message", msg => {
        console.log(msg)
    })

})

server.listen(port, () => {
    console.log(`Server is Running at PORT ${port}`)
})