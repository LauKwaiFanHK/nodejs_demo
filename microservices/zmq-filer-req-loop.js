// demonstrate no parallelism of using Zero-mq to implement socket pair with Node
// each end point of the application operates on only one request or one response
// at a time

'use strict';
const zmq = require('zeromq');
const filename = process.argv[2];
console.log(process.argv);

// Create request endpoint
const requester = zmq.socket('req');

// Handle replies from the responder
requester.on('message', data => {
    const response = JSON.parse(data);
    console.log('Received response: ', response);
});

requester.connect('tcp://localhost:60401');

// Send 5 requests for connect
// Requests will be queued in the loop
// the responder program will send a response to each request before
// even becoming aware of the next queued request i.e. operate sequentially
// a simple REQ/REP socket socket pair is not suitable for high-performance Node.js needs
// more advanced Zero-mq socket types needed
for (let i = 1; i <= 5; i++){
    console.log(`Sending a request ${i} for ${filename}`);
    requester.send(JSON.stringify({path: filename}));
}