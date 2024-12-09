const http = require('http');
const path = require('path');
const fs = require('fs');

// Create the server
const server = http.createServer((req, res) => {
    // Set the default file to serve
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Determine the file's extension to set the correct Content-Type header
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    if (extname === '.js') contentType = 'application/javascript';
    if (extname === '.css') contentType = 'text/css';
    if (extname === '.json') contentType = 'application/json';
    if (extname === '.png') contentType = 'image/png';
    if (extname === '.jpg') contentType = 'image/jpeg';

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Error: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// Set the server to listen on port 8080
server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
