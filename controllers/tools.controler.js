var Permission = require('../models/user.model').Permission;

exports.test = function(req,res) {

    var permissionList = [
        "music-artist-create",
        "music-artist-read",
        "music-artist-update",
        "music-artist-delete",
        "music-album-create",
        "music-album-read",
        "music-album-update",
        "music-album-delete",
        "music-song-create",
        "music-song-read",
        "music-song-update",
        "music-song-delete",
        "user-role-create",
        "user-role-read",
        "user-role-update",
        "user-role-delete",
        "user-user-create",
        "user-user-read",
        "user-user-update",
        "user-user-delete"
    ];

    permissionList = permissionList.map( (p) => {
        return {
            "name": p
        }
    } );

    Permission.insertMany(permissionList, function (err, data) {
        if(err){
            res.status(500).send({error: err});
        }else{
            res.send({data: data});
        }        
    })
}