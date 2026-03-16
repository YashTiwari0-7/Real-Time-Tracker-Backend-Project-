require("dotenv").config();

const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get("/", (req, res) => {
    console.log("Request received for the home page");
    res.send("Server is running");
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});