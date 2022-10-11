let io = require('socket.io')()

io.on('connection', function(socket){
  console.log('connected')
  io.emit('message from server', 'message from server - it works!')

  socket.on('disconnect', () => {
  console.log('A user disconnected')  
  })
})

module.exports = io
