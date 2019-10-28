'use strit'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermissionSchema = Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});

var RoleSchema = Schema({
    name: { type: String, required: true },
    description: { type: String },
    _permissions: [{ type: Schema.ObjectId,ref: 'Permission' } ]
});

var UserSchema = Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createAt: {type: Date, default: Date.now, elect: false },
    _role: { type: Schema.ObjectId,ref: 'Role' } 
});

var Permission = mongoose.model('Permission',PermissionSchema);
var Role = mongoose.model('Role',RoleSchema);
var User = mongoose.model('User',UserSchema);

module.exports = {
    Permission: Permission,
    Role: Role,
    User: User
}