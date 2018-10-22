const {fork} = require('child_process');

let child = fork('./forking/basic-fork-child.js');

child.on('message', (msg) => console.log('Message from child', msg) );

child.send({msg: 'message from parent'});