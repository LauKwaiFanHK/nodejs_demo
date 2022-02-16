// stict mode disables certain JS and so eliminate JS erros by throwing errors
'use strict';

// fs is a Node.js's build-in filesystem module
const fs = require('fs');

// watch method taks a path to a file and a callback function to invoke when the file changes
// here the arrow function does not receive any argument
fs.watch('target.txt', () => console.log('File: target.txt changed!'));
console.log('Now watching target.txt for changes...');
