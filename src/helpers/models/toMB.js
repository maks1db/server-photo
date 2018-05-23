const roundTo = require('round-to');

module.exports = value => roundTo.up(value / (1024 * 1024), 2);
