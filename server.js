const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Serve the frontend.html file at the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "frontend.html"));
});

// Socket.io logic
let users = {};

io.on("connection", (socket) => {
    console.log("A user connected");

    // Register new user
    socket.on("createUser", (username) => {
        users[socket.id] = username;
        socket.broadcast.emit("updateChat", "INFO", `${username} joined the chat`);
        socket.emit("updateChat", "INFO", "Welcome to the chat!");
    });

    // Handle sending messages
    socket.on("sendMessage", (message) => {
        const username = users[socket.id] || "Anonymous";
        io.emit("updateChat", username, message);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        const username = users[socket.id];
        delete users[socket.id];
        if (username) {
            io.emit("updateChat", "INFO", `${username} left the chat`);
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5500;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

