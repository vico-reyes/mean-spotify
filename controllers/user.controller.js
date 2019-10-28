var User = require('../models/user.model').User;
var Role = require('../models/user.model').Role;
const config = require('config');

//bcrypt
const bcrypt = require('bcrypt');

//config
const saltRounds = config.get('saltRounds');

console.info("SaltRounds:", saltRounds);


exports.getRoles = function(req,res){
    Role.find().exec(function (err, data){
        if(err){
            res.status(500).send({error: err});
        }else{
            res.send({data: data});
        }
    });
}

exports.getRoleById = function(req,data){
    Role.findById( req.params.id ).exec(function(err, data){
        if(err){
            res.status(500).send({error: err});
        }else{
            res.send({data: data});
        }
    });
}

exports.addRole = function(req,res){

    var role = new Role();

    Object.keys(req.body).forEach((key)=>{
        role[key] = req.body[key];
    });
    

    role.save( function(err,data){
        if(err){
            res.status(500).send({error: err});
        }else{
            res.send({data: data});
        }
    });

}

exports.updateRoleById = function(req,res){
    //ID del item es id

    var role = {};

    Object.keys(req.body).forEach((key)=>{
        role[key] = req.body[key];
    });

    Role.findByIdAndUpdate(req.params.id, role, {new: true}).exec(function(err,data){
        if(err){
            res.status(500).send( { error: err } );
        }else{
            res.send( { data: data } );
        }
    });
}

exports.deleteRoleById = function(req,res){
    //id en reequest.params.id

    Role.findByIdAndRemove( req.params.id ).exec( function(err, data){
        if(err){
            res.status(500).send({ error: err });
        }else{
            res.send( {data: data} );
        }
    });

}


//User functions

exports.getUsers = function(req,res){
    User.find().exec(function (err, data){
        if(err){
            res.status(500).send({error: err});
        }else{
            res.send({data: data});
        }
    });
}

exports.getUserById = function(req,data){
    User.findById( req.params.id ).exec(function(err, data){
        if(err){
            res.status(500).send({error: err});
        }else{
            res.send({data: data});
        }
    });
}

exports.addUser = function(req,res){

    var user = new User();

    Object.keys(req.body).forEach((key)=>{
        user[key] = req.body[key];
    });

    user.password = bcrypt.hashSync(user.password, saltRounds);    

    user.save( function(err,data){
        if(err){
            res.status(500).send({error: err});
        }else{
            res.send({data: data});
        }
    });

}

exports.updateUserById = function(req,res){
    //ID del item es id

    var user = {};

    Object.keys(req.body).forEach((key)=>{
        user[key] = req.body[key];
    });

    if(user.password){
        user.password = bcrypt.hashSync(user.password, saltRounds);
    }

    User.findByIdAndUpdate(req.params.id, user, {new: true}).exec(function(err,data){
        if(err){
            res.status(500).send( { error: err } );
        }else{
            res.send( { data: data } );
        }
    });
}

exports.deleteUserById = function(req,res){
    //id en reequest.params.id

    User.findByIdAndRemove( req.params.id ).exec( function(err, data){
        if(err){
            res.status(500).send({ error: err });
        }else{
            res.send( {data: data} );
        }
    });

}