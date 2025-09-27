const net = require("net");

const clients = [];

const server = net.createServer((socket) => {
  console.log("Client connected!");
  clients.push(socket);

  socket.on("data", (data) => {
    const msg = data.toString().trim();

    // Forward to everyone else (no echo)
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(msg + "\n");
      }
    });
  });

  socket.on("end", () => {
    console.log("Client disconnected.");
    clients.splice(clients.indexOf(socket), 1);
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });
});

server.listen(1234, () => {
  console.log("Server started on port 1234");
});
