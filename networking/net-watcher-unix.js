'use strict';
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename){
    throw Errow('Error: No filename specified.');
}

net.createServer(connection => {
    // Reporting
    console.log('Subscriber connected.');
    connection.write(`Now watching "${filename}" for changes...\n`);

    // Watcher setup
    const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`));

    // Cleanup
    connection.on('close', () => {
        console.log('Subscriber disconnected.');
        watcher.close();
    });

    // replace the TCP Port 60300 with a Unix
}).listen('/tmp/watcher.sock', () => console.log('Listening for subscribers...'));
