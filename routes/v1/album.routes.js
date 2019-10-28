var albumController = require('../../controllers/album.controller');
var authMiddleware = require('../../middlewares/auth.middleware');

module.exports = function( router ) {
    router.get('/artist/:id_artist/albums', albumController.getAlbumsByArtistId);
    router.get('/artist/:id_artist/album/:id', albumController.getAlbumByArtistIdAndAlbumId);
    // Upload image
    router.post('/artist/:id_artist/album', authMiddleware.permit("music-album-create"), albumController.addAlbumByArtistId);
    // Upload image
    router.patch('/artist/:id_artist/album/:id', authMiddleware.permit("music-album-update"), albumController.updateAlbumByArtistIdAndAlbumId);
    router.put('/artist/:id_artist/album/:id', authMiddleware.permit("music-album-update"), albumController.updateAlbumByArtistIdAndAlbumId);
    router.delete('/artist/:id_artist/album/:id', authMiddleware.permit("music-album-delete"), albumController.deleteAlbumByArtistIdAndAlbumId);
}