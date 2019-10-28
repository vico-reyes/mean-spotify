var authController = require('../../controllers/auth.controller');

module.exports = function ( router ) {
    router.post('/auth/login', authController.login); 
}