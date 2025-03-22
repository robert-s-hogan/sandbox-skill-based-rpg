// Connect to the Socket.IO server
const socket = io();

// Emit a chat message when the button is clicked
document.getElementById("sendButton").addEventListener("click", () => {
  const message = document.getElementById("messageInput").value;
  socket.emit("chat message", message);
  document.getElementById("messageInput").value = "";
});

// Listen for chat messages from the server and display them
socket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("messages").appendChild(li);
});
