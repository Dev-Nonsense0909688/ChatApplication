const WebSocket = require("ws");

const PORT = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on("connection", (ws) => {
  console.log("Client connected!");
  clients.push(ws);

  ws.on("message", (message) => {
    // Forward to all other clients
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
    clients = clients.filter(c => c !== ws);
  });
});

console.log(`Server running on port ${PORT}`);
