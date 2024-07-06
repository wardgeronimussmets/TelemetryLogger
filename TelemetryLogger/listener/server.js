const dgram = require('node:dgram');
const fs = require('fs');
const path = require('path');

const server = dgram.createSocket('udp4');


const PORT = 20777; //f1 23
const HOST = 'localhost';

const LOG_FILE = path.join(__dirname, 'f1_telemetry_log.txt');


// Function to log messages
function logMessage(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${message.toString('hex')}\n`;

    fs.appendFile(LOG_FILE, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}


server.on('listening', () => {
    const address = server.address();
    console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
    console.log(`Received ${message.length} bytes from ${remote.address}:${remote.port}`);
    logMessage(message);
});

server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});

server.bind(PORT, HOST);