const R = require('ramda');
const prepareMutation = require('./prepareMutation');

const find = model => id => {
    return [
        model.findOne({
            where: { id }
        }),
        model
    ];
};

const update = data => result => {
    return result[0]
        ? result[0].then(x => (x ? x.update(data) : result[1].create(data)))
        : result[1].create(data);
};

module.exports = (model, data) => {
    const prepareData = prepareMutation(data);
    return prepareData.id
        ? R.pipe(find(model), update(prepareData))(prepareData.id)
        : update(prepareData)([undefined, model]);
};
