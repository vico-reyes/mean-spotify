var artistController = require('../../controllers/artist.controller');
var authMiddleware = require('../../middlewares/auth.middleware');

module.exports = function( router ){
    router.get('/artists', artistController.getArtists );
    router.get('/artist/:id', artistController.getArtistById);
    router.post('/artist', [authMiddleware.permit("music-artist-create")], artistController.addArtist);
    router.patch('/artist/:id', authMiddleware.permit("music-artist-update"), artistController.updateArtistById);
    router.put('/artist/:id', authMiddleware.permit("music-artist-update"), artistController.updateArtistById);
    router.delete('/artist/:id', authMiddleware.permit("music-artist-delete"), artistController.deleteArtistById);
}