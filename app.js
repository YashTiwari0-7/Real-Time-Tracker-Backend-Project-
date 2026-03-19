require("dotenv").config();

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Store users
const users = {};

// Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join
    socket.on("join", ({ username }) => {
        users[socket.id] = {
            username,
            latitude: null,
            longitude: null,
            history: []
        };
    });

    // Location update
    socket.on("sendLocation", ({ latitude, longitude }) => {
        if (!users[socket.id]) return;

        users[socket.id].latitude = latitude;
        users[socket.id].longitude = longitude;

        users[socket.id].history.push([latitude, longitude]);

        io.emit("users:update", users);
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        delete users[socket.id];
        io.emit("users:update", users);
    });
});

// Route
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});