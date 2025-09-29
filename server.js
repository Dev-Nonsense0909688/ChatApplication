const WebSocket = require("ws");

const PORT = process.env.PORT || 1234;
const server = new WebSocket.Server({ port: PORT });

let clients = new Map(); // ws -> username

function broadcast(sender, message) {
    for (let [client, username] of clients.entries()) {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }
}

function sendUserList() {
    const users = Array.from(clients.values());
    const payload = "ONLINE:" + users.join(",");
    for (let [client] of clients.entries()) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    }
}

server.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (data) => {
        const msg = data.toString().trim();

        // First message = username registration
        if (!clients.has(ws)) {
            clients.set(ws, msg);
            console.log(`User joined: ${msg}`);
            sendUserList();
            return;
        }

        // Normal chat message
        const username = clients.get(ws);
        const formatted = `${username}:${msg}`;
        console.log("Broadcasting:", formatted);
        broadcast(ws, formatted);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        clients.delete(ws);
        sendUserList();
    });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
