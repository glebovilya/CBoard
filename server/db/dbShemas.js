var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

console.log('mongo!');

var personSchema = new Schema({
    _id: Number,
    name: String,
    surname: String,
    position: String,
    photo: String,
    current: Boolean,
    currentStatus: { type: Number, ref: 'Status' },
    projectList: [{ type: Number, ref: 'Project' }],
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }]
});

var projectSchema = new Schema({
    _id: Number,
    name: String,
    currentEmployees: [{type: Number, ref: 'Person'}],
    current: Boolean,
    start: Date,
    end: Date,
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }]
});

var statusSchema = new Schema({
    _id: Number,
    name: String,
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }]
});

var historySchema = new Schema({
    person: {type: Number, ref: 'Person'},
    project: {type: Number, ref: 'Project'},
    status: {type: Number, ref: 'Status'},
    date: /*Date*/ { type: Date, default: Date.now },
    leaving: Boolean
});


var Person = mongoose.model('Person', personSchema);
var Project = mongoose.model('Project', projectSchema);
var Status = mongoose.model('Status', statusSchema);
var History = mongoose.model('History', historySchema);

exports.Person = Person;
exports.Project = Project;
exports.Status = Status;
exports.History = History;