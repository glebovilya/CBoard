
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
//var dbModels = require('./server/db/dbShemas'); /*uncomment this line to call collections methods*/

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//todo: create route logic
app.get('/', routes.index);
app.get('/user', dataGetter.getPerson); //req should look like {id: 'some id'}
app.get('/users', express.bodyParser(), dataGetter.getPersons); //req can be empty or looks like {id:'array of ids'}
app.post('/user', express.bodyParser(), dataSetter.addPerson); //req should look like {name:'name', surname: 'surname', position: 'position', file: 'file'}
app.get('/project', dataGetter.getProject); //req should look like {id: 'some id'}
app.get('/projects', dataGetter.getProjects); //just send req here
app.post('/project', express.bodyParser(), dataSetter.addProject); //req should contain {name: 'name'(optional -> startDate: 'date')}
app.get('/status', dataGetter.getStatus); //just senr req here

/****************************************
 * rudiment routs will be removed soon
 *****************************************/
app.post('/project/:id', dataSetter.setCurrentProject); //rudiment
app.post('/user/:id', dataSetter.setCurrentPerson); //rudiment

/**
* uncomment lines to add new statuses to the DB
**/
//
//dataSetter.addStatus(1, 'Free');
//dataSetter.addStatus(2, 'Manager');
//dataSetter.addStatus(3, 'Lead');
//dataSetter.addStatus(4, 'Assigned');
//dbModels.Status.find({}, function(err, doc) {console.log(doc)})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
