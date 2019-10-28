var permissionController = require('../../controllers/tools.controler');

module.exports = function( router ){
    router.get('/tools/test', permissionController.test );
}