var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// password check
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create user model
module.exports = mongoose.model('User', userSchema);
