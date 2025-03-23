const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");  // Import path module

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ✅ Fix: Use absolute path for serving static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("place-object", (position) => {
        socket.broadcast.emit("update-object", position); // Update others
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// ✅ Use path to serve index.html correctly
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});




