const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

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

    // Emits a message to the new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // Emits a message to all but the new user
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('Got new message', message);
        // Emits a message to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    // Listening to an event
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});