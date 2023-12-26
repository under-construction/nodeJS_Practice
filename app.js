const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In middleware 1');
    next(); // Allows the request to continue to the next middleware if exists.
});

app.use((req, res, next) => {
    console.log('In middleware 2');
    res.send('<h1>Hello from Express.js</h1>');
});

const server = http.createServer(app);

server.listen(3080);