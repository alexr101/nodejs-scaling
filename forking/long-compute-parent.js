const { fork } = require('child_process');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    if(req.url === '/longCompute') {
        const computeChild = fork('./forking/long-compute-child.js');
        console.log('visited /longCompute');
        computeChild.send('start');
        computeChild.on('message', (msg) => console.log('Message from long-compute-dhild: ', msg));
    } else {
        res.end('Ok');
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});