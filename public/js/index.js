var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('Got new message', message);
    // A new li element we want to put into the messages ol
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    // uses jQuery to add the li to the DOM
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    // Prevents default behavior for the event
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});