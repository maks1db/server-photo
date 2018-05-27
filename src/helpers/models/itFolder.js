const fs = require('fs');
const path = require('path');

module.exports = folder =>
    fs.lstatSync(folder).isDirectory() &&
    path.basename(folder).indexOf('.') < 0;
