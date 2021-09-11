const socketConnection = (socket) => {
  console.log("Client connected: ", socket.id);

  socket.on("msgPayload", (payload) => {
    socket.broadcast.emit("msgPayload", payload);
  });

  socket.on("msgPayloadCallback", (payload, callback) => {
    socket.broadcast.emit("msgPayloadCallback", payload);
    callback({ msg: "Callback startegy", date: new Date() });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
};

module.exports = { socketConnection };
