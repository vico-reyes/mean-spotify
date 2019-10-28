'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    bio: { type: String },
    grammys: { type: Number  },
    photo: { type: String },
    created_at: { type: Date, default: Date.now, select: false }   
});

var Artist = mongoose.model('Artist',ArtistSchema);

module.exports = {
    Artist: Artist
}