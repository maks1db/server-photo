const R = require('ramda');

module.exports = params =>
    Object.keys(params).reduce((accum, key) => {
        return params[key] === undefined ? R.dissoc(key, accum) : accum;
    }, params);
