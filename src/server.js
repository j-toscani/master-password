// create webserver
const { get, set } = require("./lib/commands");
const url = require("url");
const fs = require("fs");

const http = require("http");

//create a server object:
const server = http.createServer(function(request, response) {
  const { pathname } = url.parse(request.url);
  if (pathname === "/favicon.ico") {
    response.writeHead(404);
    return response.end();
  }
  if (pathname === "/") {
    response.writeHead(200, { ContentType: "text/html" });
    const content = fs.readFileSync("src/view/index.html", "utf-8");
    return response.end(content);
  }
  try {
    const path = pathname.slice(1);
    if (request.method === "GET") {
      const secret = get("1234", path);
      response.write(secret);
      response.end();
    } else if (request.method == "POST") {
      console.log("POST");
      let body = "";
      request.on("data", function(data) {
        body += data;
        console.log("Partial body: " + body);
      });
      request.on("end", function() {
        console.log("Body: " + body);
        set("1234", path, body);
        response.end(`Set ${path}`);
      });
    }
  } catch (error) {
    response.write("Can not read secret");
    response.end("post received");
  }
});

server.listen(4000);
