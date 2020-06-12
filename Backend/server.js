const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const morgan = require('morgan');
const cors = require("cors");

const connectDB = require('./config/db')
const socketConnection = require('./socket-api')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//Resolve CORS Error
app.use(cors());

//Connect Database
connectDB();

//View Request URL(Logger)
app.use(morgan('dev'));

//INIT Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/auth'));

// Socket Listener
socketConnection(io)

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server is Running at PORT ${port}`)
})