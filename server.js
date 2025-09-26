const net = require("net");
const readline = require("readline");

// Setup console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const server = net.createServer((socket) => {
  console.log("Client connected!");

  // Handle messages from client
  socket.on("data", (data) => {
    console.log("Client: " + data.toString().trim());
    rl.question("You: ", (input) => {
      socket.write(input + "\n");
    });
  });

  socket.on("end", () => {
    console.log("Client disconnected.");
  });
});

server.listen(1234, () => {
  console.log("Server started. Waiting...");
});
