'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    genre: [{ type: String, enum: ['pop', 'rock','jazz'], required: true }],
    cover: { type: String },
    _artist: { type: Schema.ObjectId, ref: 'Artist'},
    _collaborators: [{ type: Schema.ObjectId, ref: 'Artist'}],
});

var Album = mongoose.model('Album',AlbumSchema);

module.exports = {
    Album: Album
}