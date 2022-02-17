'use strict';
const EventEmitter = require('events').EventEmitter;

// create a class to inherit from EventEmitter
// constructor takes an stream parameter, an object that 
// emits data events e.g. a Socket connection
// use super to invoke EventEmitter's own constructor function 
class LDJClient extends EventEmitter {
    constructor(stream){
        super();
        let buffer = '';
        stream.on('data', data => {
            buffer += data;
            let boundary = buffer.indexOf('\n');
            while (boundary !== -1){
                const input = buffer.substring(0, boundary);
                buffer = buffer.substring(boundary + 1);
                this.emit('message', JSON.parse(input));
                boundary = buffer.indexOf('\n');
            }
        });
    }

    static connect(stream){
        return new LDJClient(stream);
    }
}

module.exports = LDJClient;

