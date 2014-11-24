//Learn http://www.gtwang.org/2014/03/socket-io-node-js-realtime-app.html
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(server);

var server = http.createServer(function(req,res){
	var urls = url.parse(req.url);
	var relpath = path.join(__dirname,'/www/',urls.pathname);

	fs.stat(relpath,function(err,stats){
		if(err){
			res.writeHead(404,{});
			res.end();
		}else{
			if(stats.isDirectory()){
				//is Directory
				fs.readFile(relpath+'/index.html',function(err,data){
					console.log('View index');
					if(err){
						res.writeHead(404);
						res.end();
					}else{
						res.writeHead(200,{'Content-Type':'text/html'});
						res.end(data);
					}
				});
			}else{
				fs.readFile(relpath,function(err,data){
					if(err){
						res.writeHead(404);
						res.end();
					}else{
						res.writeHead(200,{'Content-Type':'text/html'});
						res.end(data);	
					}
				});
			}
		}
	});
});

io.on('connection', function(socket){
	console.log('connectioned!');

  socket.on('event', function(data){
  	console.log('Get Event!');
  	console.log(data);
  });

  socket.on('disconnect', function(){});
});

server.listen(80);
io.listen(server);