const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// app.listen() does the same thing behind the scenes
var server = http.createServer(app);
var io = socketIO(server);

// Configure express static middleware
app.use(express.static(publicPath));

// 'connection' event handle
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});