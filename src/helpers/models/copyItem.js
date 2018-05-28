const fs = require('fs-extra');

module.exports = (file, folder) => fs.copySync(file, folder);
