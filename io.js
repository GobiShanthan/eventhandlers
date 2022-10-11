// let io = require('socket.io')() //we are calling socket.io to create an instance of it

// // listen for new connections from clients
// io.on('connection', function(socket) {
//     console.log("Client connected!")

//     socket.on('add-circle', function(data) {
//         io.emit('add-circle', data);
//     })
// })

// module.exports = io

//socket.io related imports
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const port = process.env.PORT || 4001;
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors())
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
})

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});
// io.on('connection', function(socket){
//   console.log('connected')
//   io.emit('message from server', 'message from server - it works!')

//   socket.on('disconnect', () => {
//   console.log('A user disconnected')  
//   })
// })

// app.get('/', (req, res, next) => res.json({message: 'hello world'}))
// res.json({message: 'hello world'}))
// res.sendFile(__dirname + './index.html'));
server.listen(port, () => console.log(`Listening on port ${port}`));