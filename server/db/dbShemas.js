var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');
var db = mongoose.createConnection('127.0.0.1', 'test');
var pureautoinc  = require('mongoose-pureautoinc');

pureautoinc.init(db);

var personSchema = new Schema({
    name: String,
    surname: String,
    position: { type: Number, ref: 'Position'},
    photo: String,
    currentStatus: { type: Number, ref: 'Status', default: 1 },
    projectList: [{ type: Number, ref: 'Project' }],
    statusList: [{ type: Number, ref: 'Status'}],
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }],
    inSkillUpFrom: { type: Date, default: Date.now }
});

personSchema.plugin(pureautoinc.plugin, {
    model: 'Person',
    field: '_id',
    update: false,
    start: 1
});

var projectSchema = new Schema({
    name: String,
    currentEmployees: [{type: Number, ref: 'Person'}],
    start: { type: Date, default: Date.now },
    end: Date,
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }]
});
projectSchema.plugin(pureautoinc.plugin, {
    model: 'Project',
    field: '_id',
    update: false,
    start: 1
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

var personPositions = new Schema({
    _id: Number,
    name: String
})


var Person = mongoose.model('Person', personSchema);
var Project = mongoose.model('Project', projectSchema);
var Status = mongoose.model('Status', statusSchema);
var History = mongoose.model('History', historySchema);
var Position = mongoose.model('Position', personPositions);

exports.Person = Person;
exports.Project = Project;
exports.Status = Status;
exports.History = History;
exports.Position = Position;
