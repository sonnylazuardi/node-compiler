
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var child_process = require('child_process');
var Sync = require('sync');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

var child = child_process.fork(__dirname + '/child.js');
// var child = child_process.fork(__dirname + '/child-win.js');
var taskId = 0;
var tasks = {};
var maxQueue = 10; // menentukan seberapa banyak queue yang bisa dilayani oleh satu server

function addTask(data, callback) {
    // taskId++;
    // if (taskId > 10) taskId = 1;
    Sync(function() {
        taskId++;
        if (taskId > maxQueue) taskId = 1;
    
        child.send({id: taskId, script:data.script, inputs:data.inputs});
    
        tasks[taskId] = callback;
    });
}

child.on('message', function(message) {
    // Look up the callback bound to this id and invoke it with the result
    // console.log(message);
    tasks[message.id](message);
});

app.get('/', function(req, res) {
    res.send("node compiler v0.2");
});

app.get('/compile', function(req, res) {
    res.render("index.ejs");
});

app.post('/compile', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var password = req.body.password;
    var script = req.body.script;
    var inputs = req.body.inputs;
    addTask({script: script, inputs:inputs}, function(result) {
        res.json(result);
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('node compiler v0.2 active on port ' + app.get('port'));
});
