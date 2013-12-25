
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
var config = require('./config/appConfig').config;
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, config.viewsDirName));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger(config.logger));
app.use(express.static(path.join(__dirname, config.staticFilesDirName)));
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
app.get('/statuses', dataGetter.getStatus); //just send req here

/**
 * adds default docs to DB (Statuses, Positions and Default project "SkillUp")
 */
dataSetter.dbFeeler();

http.createServer(app).listen(config.port, config.ipToRunServerOn);
