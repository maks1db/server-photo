/*global process */
module.exports =
    process.env.NODE_ENV === 'development'
        ? require('./config.development.json')
        : require('./config.production.json');
