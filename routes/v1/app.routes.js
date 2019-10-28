var express = require('express');
var router = express.Router();


router.get('/routes', function(req, res) {
    res.send('Version 1 -- Routes');
});

require('./artist.routes')( router );
require('./album.routes')( router );
require('./song.routes')( router );

//tools routes
require('./tools.routes')(router);

//user routes
require('./user.routes')( router );

//auth
require('./auth.routes')( router );


module.exports = router;