const http = require('http');

// const server = http.createServer();

// server.on('connection', (socket) => {
//     console.log('New connection...');
// });

// server.listen(9555);


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello');
        res.end();
    };

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    };
});

server.listen(9555);
