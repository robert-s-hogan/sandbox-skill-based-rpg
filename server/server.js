/* server/server.js */
// Load environment variables from .env only in development mode
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("client"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../client/index.html");
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log(`Received message: ${msg}`);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server with Socket.IO running on port ${PORT}`);
});
