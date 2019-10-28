var Song = require('../models/song.model').Song;

exports.getSongsByAlbumId = function(req,res){
    Song.find({_album: req.params.id_album}).exec( function( err, data ) {
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
    
}

exports.getSongByAlbumIdAndSongId = function(req,res){
    var populate = [
        {path: "_album", select: {name: 1} }
    ];
    Song.findOne( {_album: req.params.id_album, _id: req.params.id} ).populate( populate ).exec( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
}

exports.addSongByAlbumId = function(req,res){

    var song = new Song();

    song.name = req.body.name;
    song.filename = req.body.filename;
    song.length = req.body.length;
    song._album = req.params.id_album;

    song.save( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
}

exports.updateSongByAlbumIdAndSongId = function(req,res){
    // ID del item req.params.id
    var song = {
        name: req.body.name,
        filename: req.body.filename,
        length: req.body.length,
        _album: req.body._album
    }
    Song.findOneAndUpdate({_album: req.params.id_album, _id: req.params.id}, song,{new: true}).exec( function(err, data) {
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });

}

exports.deleteSongByAlbumIdAndSongId = function(req,res){
    // ID req.params.id
    Song.findOneAndRemove( { _album: req.params.id_album, _id: req.params.id} ).exec( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
}