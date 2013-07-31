var http = require("http");
var url = require("url");
  
function start(route) {
  function onRequest(request, response) {
  var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
	request.setEncoding("utf-8");
	
	request.addListener("data",function(postDataChunk){
		postData += postDataChunk;
		console.log("post data connected : " + postDataChunk);
	});
	request.addListener("end",function(){
		route(pathname, response, postData);
	});
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;