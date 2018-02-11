"use strict";

const mongoose = require('./db');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const ENCRYPT_SALT = 10;

const userSchema = new schema(
{
    email : {type: String, unique: true, lowercase: true, required:true},
    nick : { type: String, unique: true, required: true },
    name : {type: String, lowercase: true},
    last_name : {type: String, lowercase: true},
    password : {type: String, select:false},
    avatar : String,
    singupDate :{ type: Date, default: Date.now() },
    lastLogin : Date,
    tags : [String]

}, {collection: "Users"});

/*check is passwords match to log in */
userSchema.methods.pass = function(password, cb)
{    
    bcrypt.compare(password, this.password, (err, isMatch)=>
    {
        if (err) return cb( false,{error:"Password is incorrect"} );
        return cb( isMatch, {match: isMatch} );
    });
}

/*hash password before saving new user*/

var hashPasswordSave = function(next) 
{
    var user = this;    
    if (!this.isModified('password')) return next();  
    
    bcrypt.genSalt(ENCRYPT_SALT, (err, salt) =>
    {
        if(err) return next(err);
                    
        bcrypt.hash(user.password, salt, null, (err,hash) =>
        {
            if(err) return next(err);
            user.password = hash;
            return next();
        });
    });
};

userSchema.pre('save', hashPasswordSave);

const user = mongoose.model('User', userSchema);

class UserActions
{
    registerUser(newUser, cb) 
    {        
        newUser.save((err) =>
        {
            if(err) return cb(false, {error: "Couldn't add user: " + err});
            return cb(true, {message: "User added"});
        });
    }
}


module.exports = {UserActions, user}




