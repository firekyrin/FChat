/*
 * filename: app.js
 * author: firekyrin
 * uri: http://www.firekyrin.com/
 * version: 1.0
 */

var express = require('express'); 
//var app = express.createServer(); 
var http = require('http');
var app = express(); 
var server = http.createServer(app);
var io = require('socket.io').listen(server); 
app.configure(function () { 
	app.use(express.bodyParser()); 
	app.use(express.methodOverride()); 
	app.use(express.logger()); 
	app.use(express.bodyParser()); 
	app.use(express.cookieParser()); 
	app.use(express.session({ secret: "skjghskdjfhbqigohqdioukd", })); 
}); 

var conns = {}; 

function getUserList()
{
	var ret = {};
	for(var ccid in conns)
	{
		/*
		ret[ccid]['ccid'] = conns[ccid].cid;
		ret[ccid]['cnick'] = conns[ccid].cnick;
		*/
		ret[ccid]= conns[ccid].cnick;
	}
	
	return ret;
}

io.sockets.on('connection', function (socket) { 
	//var cid = socket.id; 
	var currentClient = {
		cid: socket.id,
		cnick: "aaa",
		socket: socket
	};

	//conns[cid] = socket; 
	conns[currentClient.cid] = currentClient;
	for(var ccid in conns) { 
		var soc = conns[ccid].socket; 
		soc.emit('join', {cid: conns[ccid]['cid']}); 
		soc.emit('userlist', JSON.stringify(getUserList()));
	} 
	socket.on('disconnect', function () { 
		delete conns[currentClient.cid]; 
		for(var ccid in conns) { 
			var soc = conns[ccid].socket; 
			soc.emit('quit', {cid: conns[ccid].cid}); 
			soc.emit('userlist', JSON.stringify(getUserList()));
		} 
	}); 
	socket.on('say', function (data) { 
		data.cid = currentClient.cid; 
		for(var ccid in conns) { 
			var soc = conns[ccid].socket; 
			soc.emit('broadcast', data); 
		} 
	}); 
	socket.on('submitnick', function (data) {
		//console.log('my server get cid:'+data.cid);
		console.log('my server get nick:'+data.myname);
		conns[currentClient.cid].cnick = data.myname;
		for(var ccid in conns) {
			var soc = conns[ccid].socket;
			soc.emit('userlist', JSON.stringify(getUserList()));
		}
	});
}); 

app.get('/', function (req, res) { 
	//res.sendfile(__dirname + '/public/index.html'); 
	res.sendfile(__dirname + '/index.html'); 
}); 
app.use('/js', express.static(__dirname + '/js')); 
//app.listen(8080); 
server.listen(8080); 
console.log('daemon start on http://localhost:8080');

