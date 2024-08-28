const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function(socket){
    console.log('A user connected');

    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });

    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });

    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000/");
});
