var Album = require('../models/album.model').Album;
var common = require('../services/common');

exports.getAlbumsByArtistId = function(req,res){
    Album.find({_artist: req.params.id_artist}).exec( function( err, data ) {
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
        
    });
    
}

exports.getAlbumByArtistIdAndAlbumId = function(req,res){
    var populate = [
        {path: "_collaborators", select: {name: 1, _id: 0} }
    ];
    Album.findOne( {_artist: req.params.id_artist, _id: req.params.id} ).populate( populate ).exec( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
}

exports.addAlbumByArtistId = function(req,res){
    

    var album = new Album();

    album.name = req.body.name;
    album.year = req.body.year;
    album.genre = req.body.genre;
    album._artist = req.params.id_artist;
    album._collaborators = req.body._collaborators;

    if ( req.body.cover && req.body.cover.length > 100 ) {
        var filename = 'album-'+album._id+'.jpg';
        // Upload image
        if ( common.uploadImage(filename, req.body.cover) ) {
            album.cover = filename;
        } else {
            res.status(500).send({error: 'Error uploading image'});
            return;
        }
    }

    album.save( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });

}

exports.updateAlbumByArtistIdAndAlbumId = function(req,res){
    // ID del item req.params.id

    var album = {
        name: req.body.name,
        year: req.body.year,
        genre: req.body.genre,
        _artist: req.body._artist,
        _collaborators: req.body._collaborators,
        cover: req.body.cover
    }

    if ( req.body.cover && req.body.cover.length > 100 ) {
        var filename = 'album-'+req.params.id+'.jpg';
        // Upload image
        if ( common.uploadImage(filename, req.body.cover) ) {
            album.cover = filename;
        } else {
            res.status(500).send({error: 'Error uploading image'});
            return;
        }
    }

    Album.findOneAndUpdate({_artist: req.params.id_artist, _id: req.params.id}, album,{new: true}).exec( function(err, data) {
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });

}

exports.deleteAlbumByArtistIdAndAlbumId = function(req,res){
    // ID req.params.id
    Album.findOneAndRemove( { _artist: req.params.id_artist, _id: req.params.id} ).exec( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
}