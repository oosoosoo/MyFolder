var requestHandlers = require("./requestHandlers");

	var handle = {}
	handle["/start"] = requestHandlers.start;
	handle["/upload"] = requestHandlers.upload;
	
	function route(pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response,postData);
  } else {
    console.log("No request handler found for " + pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("No handler found");
    response.end();
  }
}

exports.route = route;