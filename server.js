const http = require('http');

const server = http.createServer((request,response)=>{
    var name ='nitish'
    response.writeHead(200,{'content-type':'text/plain'})
    response.end(hello from ${name}!);
});
server.listen(3000,() =>{
    console.log('server running at http://localhost:3000/');
});