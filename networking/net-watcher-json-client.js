'use strict';
const net = require('net');
// create a client connection to localhost port 60300, then waits for data
const client = net.connect({port: 60300});
// when a data event appears, the callback function takes the incoming buffer object
// parses the JSON message, then logs an message to the console
client.on('data', data => {
    const message = JSON.parse(data);
    if(message.type === 'watching'){
        console.log(`Now watching: ${message.file}`);
    } else if (message.type === 'changed'){
        const date = new Date(message.timestamp);
        console.log(`File changed: ${date}`);
    } else {
        console.log(`Unrecognized message type: ${message.type}`);
    }
});