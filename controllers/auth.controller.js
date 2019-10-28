var User = require('../models/user.model').User;

var jwt = require('../services/jwt');


//var config = require('config');

//bcrypt
const bcrypt = require('bcrypt');

//jwt-simple
//var jwt = require('jwt-simple');

//config
//const jwtSecret = config.get('jwtSecret');
//console.info("Jwt Secret:", jwtSecret);


exports.login = function(req,res){
    User.findOne( {"email": req.body.email} ).exec(function (err, data){
        if(err){
            res.status(500).send({error: err});
        }else{
            if(data){
                if(bcrypt.compareSync(req.body.password, data.password)){

                    //var payload = {"_id": data.id};
                    //var token = jwt.encode(payload, jwtSecret);

                    var token = jwt.encode({ _id: data._id });

                    res.send({data: data, token: token});
                    
                }else res.status(403).send({error: "El usuario no existe!!!"})
            }else{
                res.status(403).send({error: "El usuario no existe!!!"})
            }
        }
    });
}