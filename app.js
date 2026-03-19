require("dotenv").config();

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);




app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));   
// location update event from client
io.on("connection", (socket) => {
    socket.on("sendLocation", (data) => {
        io.emit("recievedLocation", {id: socket.id, ...data});
    });
    socket.on("disconnect", () => {
        io.emit("userDisconnected", {id: socket.id});
    });

});

app.get("/", (req, res) => {
    console.log("Request received for the home page");
    res.render("index");
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});