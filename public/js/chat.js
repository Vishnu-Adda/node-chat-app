var socket = io();

// Function to automatically scroll to bottom once chat starts to fill up the page
function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight     + 
        scrollTop        + 
        newMessageHeight + 
        lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

// Event handler to allow the client to join a room
socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    // Sets up process for joining a room
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            // Redirect them to the root page
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

// Event handler for when the client exits the room
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// Have the users list update on the side whenever someone joins or leaves
socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

// When the client makes a new message
socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

// When the client wants to send their location, using the API
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

// Adding a new message to the page
jQuery('#message-form').on('submit', function (e) {
    // Prevents default behavior for the event
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
// How the button should look like while sending location
locationButton.on('click', function () {
    // Opera mini and old IE don't support the geolocation API
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});
