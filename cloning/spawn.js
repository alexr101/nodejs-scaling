const {spawn} = require('child_process');

// print working directory
// second argument is arguments to pass to commant
const pwd = spawn('pwd', ['', '-type', 'f']); 
const wc = spawn('wc', ['-l']);

// you can pipe the stdout of one child process
// into the stdin of another child process
pwd.stdout.pipe(wc.stdin);
wc.stdout.on('data', (data) => {
    console.log(`wc stdout ${data}`);
    
})

pwd.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);  
});

pwd.stdin.on('data', (data) => {
    console.log(`child stdin: \n${data}`);
});

// All spawns implement EventEmitter
pwd.on('exit', (code, signal) => {
    console.log(`child process exited with code ${code}, signal ${signal}`);
})

// other events: disconnets, error, message, close
// stdio objects: child.stdin, child.stdout, child.stderr
