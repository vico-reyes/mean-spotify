var Artist = require('../models/artist.model').Artist;
var common = require('../services/common');

exports.getArtists = function(req,res){
    Artist.find().exec( function( err, data ) {
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
        
    });
    
}

exports.getArtistById = function(req,res){
    Artist.findById( req.params.id ).exec( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
}

exports.addArtist = function(req,res){

    var artist = new Artist();

    artist.name = req.body.name;
    artist.country = req.body.country;
    artist.bio = req.body.bio;
    artist.grammys = req.body.grammys;

    if ( req.body.photo && req.body.photo.length > 100 ) {
        var filename = 'artist-'+artist._id+'.jpg';
        // Upload image
        if ( common.uploadImage(filename, req.body.photo) ) {
            artist.photo = filename;
        } else {
            res.status(500).send({error: 'Error uploading image'});
            return;
        }
    }

    artist.save( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
}

exports.updateArtistById = function(req,res){
    // ID del item req.params.id

    var artist = {
        name: req.body.name,
        country: req.body.country,
        bio: req.body.bio,
        grammys: req.body.grammys,
        photo: req.body.photo
    }

    if ( req.body.photo && req.body.photo.length > 100 ) {
        var filename = 'artist-'+req.params.id+'.jpg';
        // Upload image
        if ( common.uploadImage(filename, req.body.photo) ) {
            artist.photo = filename;
        } else {
            res.status(500).send({error: 'Error uploading image'});
            return;
        }
    }

    Artist.findByIdAndUpdate(req.params.id, artist,{new: true}).exec( function(err, data) {
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });

}

exports.deleteArtistById = function(req,res){
    // ID req.params.id
    Artist.findByIdAndRemove( req.params.id ).exec( function(err, data){
        if ( err ) {
            res.status(500).send({error: err});
        } else {
            res.send({data: data});
        }
    });
}