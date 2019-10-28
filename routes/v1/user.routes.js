var userController = require('../../controllers/user.controller');
var authMiddleware = require('../../middlewares/auth.middleware');

module.exports = function( router ){
    router.get('/users', authMiddleware.permit("user-user-read"), userController.getUsers );
    router.get('/user/:id', authMiddleware.permit("user-user-read"), userController.getUserById);
    router.post('/user', authMiddleware.permit("user-user-create"), userController.addUser);
    router.patch('/user/:id', authMiddleware.permit("user-user-update"), userController.updateUserById);
    router.put('/user/:id', authMiddleware.permit("user-user-update"), userController.updateUserById);
    router.delete('/user/:id', authMiddleware.permit("user-user-delete"), userController.deleteUserById);

    router.get('/roles', authMiddleware.permit("user-role-read"), userController.getRoles );
    router.get('/role/:id', authMiddleware.permit("user-role-read"), userController.getRoleById);
    router.post('/role', authMiddleware.permit("user-role-create"), userController.addRole);
    router.patch('/role/:id', authMiddleware.permit("user-role-update"), userController.updateRoleById);
    router.put('/role/:id', authMiddleware.permit("user-role-update"), userController.updateRoleById);
    router.delete('/role/:id', authMiddleware.permit("user-role-delete"), userController.deleteRoleById);
}