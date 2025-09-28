// server.js - TCP Chat Server
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected:", socket.remoteAddress);

  socket.on("data", (data) => {
    const msg = data.toString().trim();
    console.log("Received:", msg);

    // Broadcast to everyone else
    server.connections.forEach((client) => {
      if (client !== socket) {
        client.write(msg + "\n");
      }
    });
  });

  socket.on("end", () => {
    console.log("Client disconnected:", socket.remoteAddress);
  });
});

server.connections = [];

server.on("connection", (socket) => {
  server.connections.push(socket);
  socket.write("Welcome to TCP chat!\n");

  socket.on("close", () => {
    server.connections = server.connections.filter((s) => s !== socket);
  });
});

const PORT = process.env.PORT || 1234;
server.listen(PORT, () => {
  console.log("TCP server running on port", PORT);
});
