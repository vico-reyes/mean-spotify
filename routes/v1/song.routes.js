var songController = require('../../controllers/song.controller');
var authMiddleware = require('../../middlewares/auth.middleware');

module.exports = function( router ){
    router.get('/album/:id_album/songs', songController.getSongsByAlbumId);
    router.get('/album/:id_album/song/:id', songController.getSongByAlbumIdAndSongId);
    router.post('/album/:id_album/song', authMiddleware.permit("music-album-create"), songController.addSongByAlbumId);
    router.patch('/album/:id_album/song/:id', authMiddleware.permit("music-album-update"), songController.updateSongByAlbumIdAndSongId);
    router.put('/album/:id_album/song/:id', authMiddleware.permit("music-album-update"), songController.updateSongByAlbumIdAndSongId);
    router.delete('/album/:id_album/song/:id', authMiddleware.permit("music-album-delete"), songController.deleteSongByAlbumIdAndSongId);
}