//config file
//var config = require('config');
//jwt-simple version 2
var jwt = require('../services/jwt');
//jwt-simple
//var jwt = require('jwt-simple');
//user model
var User = require('../models/user.model').User;

//const jwtSecret = config.get('jwtSecret');

exports.permit = function(permission){
    return function (req, res, next) {
        console.log("Request:", req.user._role._permissions);
        if(req.user._role._permissions.indexOf(permission) != -1) next();
        else res.status(403).send("Unauthorized access!!!");
    }
};

exports.getToken = function(req, res, next){
    var token = req.headers.authorization;

    if(token){
        var decoded = jwt.decode(token);
        console.log("Decode:", decoded);
        if(decoded && decoded._id){
            User.findById(decoded._id).populate({path: "_role", populate: { path: "_permissions"} }).lean().exec(function(err, data){
                if(data){
                    data._role._permissions = data._role._permissions.map( p => p.name);
                    req.user = data;
                    next();
                } else {
                    res.status(403).send({error: 'invalid user'})
                }
                
            });
        }else{
            res.status(403).send({error: 'invalid token'})
        } 
    }else next();
}