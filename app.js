var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var authMiddleware = require('./middlewares/auth.middleware');


var appRoutes = require('./routes/v1/app.routes');
var app = express();


var logger = require('morgan');
var bodyParser = require('body-parser');

// DB Connect
mongoose.connect('mongodb://localhost:27017/spotify', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, res) {
    if (err) {
        console.log('Error en la conexión a la BD');
    } else {
        console.log(' DB Connected');
    }
});

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use('/v1', authMiddleware.getToken);

//models
var Artist = require('./models/artist.model').Artist;
var Album = require('./models/album.model').Album;
var Song = require('./models/song.model').Song;

// Load routes
app.use('/v1', appRoutes);

app.get('/', function(req, res) {
    res.send('Welcome Mr. Reyes');
});

app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});