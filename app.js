
/*********************
* Module dependencies.
**********************/

var express = require('express');
var routes = require('./routes');
var errorHandler = require('./routes/errorPage');
var http = require('http');
var path = require('path');
var dataSetter = require('./server/db/dataSetter');
var dataGetter = require('./server/db/dataGetter');
var dbModels = require('./server/db/dbShemas'); /*uncomment this line to call collections methods*/

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(app.router);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/404', errorHandler.error);

/*******************************************************************
 * every app.get||app.post below returns json with requested obj
 * commented lines represents data to be send in request from client
 *******************************************************************/

app.get('/user', dataGetter.getPerson); //{id: 'num'}
app.get('/users', dataGetter.getPersons); //{} or {id:'array of ids'}
app.post('/user', dataSetter.addPerson); //{name:'str', surname: 'str', position: 'str', file: 'filepath'}
app.get('/project', dataGetter.getProject); //{id: 'num'}
app.get('/projects', dataGetter.getProjects); //just send req here
app.post('/project', dataSetter.addProject); //{name: 'str'(optional -> startDate: 'date')}
app.post('/project/:id', dataSetter.modifyProject); //{date: 'date')}
app.post('/history', dataSetter.addHistory); //{personID: 'num', projectID: 'num', statusID: 'num', leaving: 'Boolean'(optional date: 'date')}
app.get('/position', dataGetter.getPositions); //just send req here

/****************************************************
* uncomment lines below to add new statuses to the DB
*****************************************************/
//dataSetter.addStatus(1, 'Free');
//dataSetter.addStatus(2, 'Manager');
//dataSetter.addStatus(3, 'Lead');
//dataSetter.addStatus(4, 'Assigned');

/****************************************************
 * uncomment lines below to add new positions to the DB
 *****************************************************/
//dataSetter.addPosition(1, 'JS');
//dataSetter.addPosition(2, 'Manager');
//dataSetter.addPosition(3, 'QA');
//dataSetter.addPosition(4, 'pHp');
//dataSetter.addPosition(5, 'TeamLeads');


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
