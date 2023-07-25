const http = require('http');
const server = http.createServer((요청, 응답) => {
    응답.writeHead(200, {'Content-Type' : 'application/json'});
    응답.end('안녕 node.js에서 만든 서버야')

});

server.listen(8000);