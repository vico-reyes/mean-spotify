//jwt-simple
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('config');

const jwtSecret = config.get('jwtSecret');

exports.encode = function ( data, req ) {
    var payload = {
        cat: moment().unix(),
        exp: moment().add(1, 'month').unix()
    };
    console.log('payload: ', payload);
    Object.keys(data).forEach(key => {
        payload[key] = data[key];
    });
    console.log('payload 2: ', payload);
    return jwt.encode(payload, jwtSecret);
}

exports.decode = function ( token ) {
    try {
        return jwt.decode(token, jwtSecret);        
    } catch( err ) {
        return {};
    }
    
}

exports.validate = function ( token, req) {
    var data = jwt.decode(token, jwtSecret);   
    if( !data ) return false;
    //validar fecha de expiracion sea posterior a al actual
    return moment().isBefore(data.exp);//true para token valido

}

exports.encodeCustom = function ( payload ) {
    return jwt.decode(payload, jwtSecret);    
}