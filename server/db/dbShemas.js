var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

console.log('mongo!');

var personSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    surname: String,
    position: String,
    photo: String,
    current: Boolean
});

var projectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    current: Boolean
});

var statusSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
});

var historySchema = new Schema({
    person: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    project: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    status: [{type: Schema.Types.ObjectId, ref: 'Status'}],
    date: { type: Date, default: Date.now },
    exiting: Boolean
});

exports.personSchema = personSchema;
exports.projectSchema = projectSchema;
exports.statusSchema = statusSchema;
exports.historySchema = historySchema;