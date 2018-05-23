/**
 *  run function if predicate TRUE
 *
 *  @param {Function/Boolean} predicate
 *  @func {Function} running function
 *  @value {Any} any value
 */
module.exports = predicate => func => value =>
    (typeof predicate === 'function' ? predicate(value) : predicate)
        ? func(value)
        : value;
