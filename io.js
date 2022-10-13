let io = require("socket.io")();
let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const verifiedUser = onlineUsers.find((user) => user.userId === userId);
  if (verifiedUser) {
    return verifiedUser;
  }
};

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  io.emit("connAcknowledge", socket.id);

  socket.on("newUser", (userId) => {
    console.log(userId.name, "is connected");
    console.log(userId.Id, "is connected");
    addNewUser(userId.Id, socket.id);
    console.log("All online users: ");
    console.log(onlineUsers);
  });
  // io.emit('connAcknowledge', `Detect connection from socketID: ${socket.id}`)

  socket.on("message", (data) => {
    console.log(data);
    const receiver = getUser(data.vendorId);

    const sender = getUser(data.userId);
    const senderSocket = onlineUsers.find(
      (user) => user.userId === data.userId
    ).socketId;
    console.log(senderSocket);
    if (!receiver) {
      io.to(senderSocket).emit("feedbackOffline", "User is offline");
    } else {
      const receiverSocket = onlineUsers.find(user => user.userId === receiver.userId).socketId
      returnMessage = {
        'user': data.name, 
        'userId': data.userId,
        'message': data.text, 
        'recipientId': data.vendorId}
      io.to(receiverSocket).emit('feedbackOnline', returnMessage)
    }
  });

  socket.on("disconnect", (socket) => {
    console.log(socket, "line 49");
    console.log(`SocketID ${socket.id} disconnected`);
    // onlineUsers = onlineUsers.filter(user=>user.socketId !== socket.id)
    removeUser(socket.id);
    console.log(onlineUsers);
  });
});

module.exports = io;
