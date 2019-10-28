var fs = require('fs');
var config = require('config');
const upload_dir = config.get('upload_dir');

exports.uploadImage = function( filename, base64 ) {
    // Clean base64 input
    base64 = base64.replace(/^data:image\/jpeg;base64,/, "");
    base64 = base64.replace(/^data:image\/png;base64,/, "");
    // Convert base 64 to file
    fs.writeFileSync(upload_dir + filename, base64, { encoding: 'base64' });
    if (fs.existsSync(upload_dir + filename)) {
        return true;
    }
    return false;
}