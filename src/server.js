// create webserver
const { get } = require("./lib/commands");
const url = require("url");
const fs = require("fs");

const http = require("http");

//create a server object:
const server = http.createServer(function(request, response) {
  const { pathname } = url.parse(request.url);
  if (pathname === "/favicon.ico") {
    response.writeHead(404);
    return response.end();
  } else if (pathname === "/") {
    response.writeHead(200, { ContentType: "text/html" });
    const content = fs.readFileSync("src/view/index.html", "utf-8");
    return response.end(content);
  }
  try {
    const secret = get("1234", pathname.slice(1));
    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }
  return response.end();
});

server.listen(4000);
