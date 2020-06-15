const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const morgan = require('morgan');
const cors = require("cors");

const connectDB = require('./config/db')
const socketConnection = require('./socket-api')

const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

//Resolve CORS Error
app.use(cors());

//Connect Database
connectDB();

//View Request URL(Logger)
app.use(morgan('dev'));

//INIT Middleware
app.use(express.json({ extended: false }))


// Socket Listener
// socketConnection(io)

// app.use('/api/messages', checkUser)

// // ('*', checkUser);

// function checkUser(req, res, next) {
// //   if ( req.path == '/api/login')
// //   { return next(); }
// //   if ( req.path == '/api/register') {return next();}

//   req.io = io;
//   console.log("bdwebhifhbewfbew",req.io,io)
//   next();
// }

const port = process.env.PORT || 5000

const server = app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log("New Broadcast Connection")
    //Someone is typing
    socket.on("typing", user => {
        socket.broadcast.emit("typing", user);
    });

    socket.on("stopTyping", () => {
        socket.broadcast.emit("stopTyping")
    })
})
// Assign socket object to every request
app.use(function(req, res, next) {
    req.io = io;
    next();
});


// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'))

