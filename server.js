const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const server = net.createServer((socket) => {
  console.log("Client connected!");

  socket.on("data", (data) => {
    console.log("Client: " + data.toString().trim());
    process.stdout.write("You: ");
  });

  socket.on("end", () => {
    console.log("Client disconnected.");
    rl.close();
  });

  rl.on("line", (line) => {
    socket.write(line + "\n");
    process.stdout.write("You: ");
  });
});

server.listen(1234, () => {
  console.log("Server started. Waiting...");
  process.stdout.write("You: ");
});
