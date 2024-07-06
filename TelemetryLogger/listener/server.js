const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

const PORT = 20777; //f1 23
const HOST = 'localhost';

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
    console.log(`Received message from ${remote.address}:${remote.port}`);
    console.log(`Message: ${message}`);
});

server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});

server.bind(PORT, HOST);