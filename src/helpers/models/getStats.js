const fs = require('fs');

module.exports = path => fs.statSync(path);
