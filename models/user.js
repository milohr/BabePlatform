"use strict";

const mongoose = require('./db');
const schema = mongoose.Schema;
const encrypt = require('bcrypt-nodejs');
const ENCRYPT_SALT=10;

const userSchema = new schema(
{
    email: {type: String, unique: true, lowercase: true, required:true},
    name: {type: String, lowercase: true},
    last_name: {type: String, lowercase: true},
    password: {type: String, select:false},
    avatar: String,
    singupDate:{ type: Date, default: Date.now() },
    lastLogin: Date,

}, {collection: "Users"});

