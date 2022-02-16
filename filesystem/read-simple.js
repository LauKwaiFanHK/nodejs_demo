'use strict';
const fs = require('fs');
fs.readFile('target.txt', (err, data) => {
	if (err){
	  throw errh;
	}
	console.log(data.toString());
});
