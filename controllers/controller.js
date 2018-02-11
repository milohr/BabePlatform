"use strict";

const controllers =
{
    /*VIEWS*/
    BabeIt :  require('./views/index'),
    
    /*API*/
    User : require('./api/user_api')
};

module.exports = controllers;
