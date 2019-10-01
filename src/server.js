// create webserver
const { get } = require("./lib/commands");
const url = require("url");

const http = require("http");

//create a server object:
const server = http.createServer(function(request, response) {
  if (request.url === "/favicon.ico") {
    return response.end();
  }
  try {
    const secret = get(
      "1234",
      url.parse(request.url, false, true).pathname.slice(1)
    );
    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }
  return response.end();
});

server.listen(4000);
