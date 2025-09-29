const WebSocket = require("ws");

const PORT = 1234;
const server = new WebSocket.Server({ port: PORT });

let clients = [];

server.on("connection", (ws) => {
    console.log("New client connected");
    clients.push(ws);

    ws.on("message", (message) => {
        console.log("Received:", message.toString());
        // Broadcast to all other clients
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        clients = clients.filter(c => c !== ws);
    });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
