'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
    name: { type: String, required: true },
    filename: { type: String, required: true },
    length: { type: Number, required: true },
    created_at: { type: Date, default: Date.now, select: false },
    _album: { type: Schema.ObjectId, ref: 'Album'},
      
});

var Song = mongoose.model('Song',SongSchema);

module.exports = {
    Song: Song
}