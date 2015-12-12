var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    local  : {
        userEmail : String,
        date : String,
        text : String
    }
});

module.exports = mongoose.model('Note', NoteSchema);