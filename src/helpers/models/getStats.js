const fs = require('fs');

module.exports = path => new Promise((resolve) => {
    fs.stat(path, (err, stats) => {
        resolve(stats);
    });
});