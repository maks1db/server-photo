const models = require('../models');

module.exports = async item => {
    const items = await models.item.findAll({
        where: {
            orderNumber: {
                $gte: item.orderNumber
            },
            id: {
                $not: item.id
            }
        },
        order: [['orderNumber']]
    });

    let ind = item.orderNumber;
    for (let e of items) {
        ind++;
        e.orderNumber = ind;
        await e.save();
    }
};
