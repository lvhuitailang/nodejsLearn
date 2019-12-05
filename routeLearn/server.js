let http  = require('http');
let url = require('url');
function start(route){
    function onRequest(request,response){
        let pathname = url.parse(request.url).pathname;
        console.log('pathname:'+pathname);

        route(pathname);

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }
    http.createServer(onRequest).listen(8989);
    console.log("Server has started.");
}
module.exports.start = start;