
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var dataSetter = require('./server/db/dataSetter');
var dataGetter = require('./server/db/dataGetter');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//todo: create route logic
app.get('/', routes.ind);
app.get('/user', dataGetter.getPerson);
app.get('/users', dataGetter.getPersons);
app.post('/user', express.bodyParser(), dataSetter.addPerson);
app.post('/user/:id', dataSetter.setCurrentPerson);
app.get('/project', dataGetter.getProject);
app.get('/projects', dataGetter.getProjects);
app.post('/project', express.bodyParser(), dataSetter.addProject);
app.post('/project/:id', dataSetter.setCurrentProject);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
