// create webserver
const { get } = require("./lib/commands");

const http = require("http");

//create a server object:
const server = http.createServer(function(request, response) {
  if (request.url === "/favicon.ico") {
    return response.end();
  }
  try {
    const secret = get("1234", request.url.slice(1));
    response.write(secret);
  } catch (error) {
    response.write("Error: 404, not Found");
  }
  return response.end();
});

server.listen(4000);
