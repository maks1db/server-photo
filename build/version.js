/*global process */
module.exports = () =>
    process.env.TYPE
        ? `demo_${new Date().valueOf()}`
        : require('../package.json').version;
