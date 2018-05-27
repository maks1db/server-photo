const path = require('path');

module.exports = file =>
    file.match(/(jpg|png|gif|JPG|JPEG)$/gm) !== null &&
    path.basename(file).indexOf('.') > 0;
