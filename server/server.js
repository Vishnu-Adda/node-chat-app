const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

    socket.on('createMessage', (message) => {
        console.log('Got new message', message);
        // Emits a message to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    // Listening to an event
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});