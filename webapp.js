var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'));

var bugdata = [
	{id : 1, status : "Open", priority : "P1", owner : "Ravan", title : "App crashes on open" },
	{id : 2, status : "New", priority : "P2", owner : "Eddie", title : "Misaligned border on panel" }
];

app.get('/api/bugs', function(req, res){
	res.json(bugdata);
});

app.use(bodyParser.json());
app.post('/api/bugs', function(req, res){
	console.log("Req body:", req.body);
	var newBug = req.body;
	newBug.id = bugdata.length + 1;
	bugdata.push(newBug);
	res.json(newBug);
});

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});