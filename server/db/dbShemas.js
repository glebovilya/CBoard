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
    history: [{ type: Number, ref: 'History' }]
});

var projectSchema = new Schema({
    _id: Number,
    name: String,
    current: Boolean,
    history: [{ type: Number, ref: 'History' }]
});

var statusSchema = new Schema({
    _id: Number,
    name: String,
    history: [{ type: Number, ref: 'History' }]
});

var historySchema = new Schema({
    _id: Number,
    person: {type: Number, ref: 'Person'},
    project: {type: Number, ref: 'Project'},
    status: {type: Number, ref: 'Status'},
    date: Date,
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