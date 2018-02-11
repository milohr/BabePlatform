"use strict";

const status = require('../../utils/status')
const model = require('../../models/user')

const user = new model.UserActions()
const hash = require('../../services/hash')

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

class UserApi
{
    register(req, res)
    {
        if(req.body.nick && req.body.password && req.body.email)
        {
            let newUser = new model.user(
            {
                email: req.body.email,
                nick: req.body.nick,
                name: req.body.name,
                last_name: req.last_name,
                password : req.body.password,
                lastLogin: Date.now(),
                avatar: req.body.avatar
            
            })
            
            if((newUser.email).includes (' ') ||
                (newUser.nick).includes (' ') ||
                !emailRegex.test(newUser.email)
            ) return res.status(status.bad.code).send({error:status.bad.msg});
            
            user.registerUser(newUser, (ok, msg) => 
            {
                if(ok) 
                    return res.status(status.ok.code).send({
                        message:msg.message, 
                        token: hash.createToken({
                            id: newUser._id,
                            nick: newUser.email,
                            email: newUser.email                            
                        })                        
                    });                              
                              
                return res.status(status.bad.code).send(msg);
                
            }) 
        } else res.status(status.bad.code).send({error:status.bad.msg});      
    }
}

module.exports = UserApi
