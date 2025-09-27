const WebSocket = require("ws");

const PORT = process.env.PORT || 10000; // Render assigns a random port
const server = new WebSocket.Server({ port: PORT });

let clients = [];

server.on("connection", (ws) => {
  console.log("Client connected!");
  clients.push(ws);

  ws.on("message", (message) => {
    const msg = message.toString().trim();

    // Forward to everyone else
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
    clients = clients.filter((c) => c !== ws);
  });
});

console.log(`Server running on port ${PORT}`);
