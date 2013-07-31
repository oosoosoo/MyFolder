var server=require('net').createServer();

var port = 4001;

var sockets = [];

server.on('listening', function(){
  console.log('Server is listening on port',port);
});

server.on('connection', function(socket){
  console.log('Server has a new connection : '+socket.remoteAddress);
  socket.setEncoding('utf8');
  if( sockets.indexOf(socket) < 0 ){
    sockets.push(socket);
  }
  console.log('number of connections : [' + sockets.length + ']');
  
  //데이터가 전송될 경우 진입
  socket.on('data', function(data){
    sockets.forEach(function(oldsocket){
      if(oldsocket !== socket){
        oldsocket.write(data);
      }
    });
  });
  
  //connection 이 종료되었을 경우 진입
  socket.on('end', function(data){
    socket.end();
  });

});

server.on('close', function(){
});

server.on('error', function(){
  console.log('err!!');
});

server.listen(port);