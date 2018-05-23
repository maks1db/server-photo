const models = require('../models');
const update = require('../../helpers/models/update');
const updateOrderNumber = require('./updateOrderNumber');
const R = require('ramda');
const runIf = require('../../helpers/logic/runIf');
const Op = require('sequelize').Op;

const resolvers = {
    Item: {
        priceList: async arg => {
            const price = await models.itemPrice.findAll({
                include: [{ model: models.itemUrl }],
                where: {
                    itemId: arg.id,
                    price: {
                        $gt: 0
                    }
                },
                order: [['date', 'DESC']],
                limit: 50
            });

            return price.reduce(
                (accum, item) =>
                    accum.find(x => x.itemUrl.domain === item.itemUrl.domain)
                        ? accum
                        : R.append(item, accum),
                []
            );
        },
        minPrice: async arg => {
            const date = new Date();
            const price = await models.itemPrice.findAll({
                include: [{ model: models.itemUrl }],
                where: {
                    itemId: arg.id,
                    price: {
                        $gt: 0
                    },
                    date: {
                        //2 mounths
                        [Op.between]: [
                            date - 2 * 32 * 24 * 60 * 60 * 1000,
                            date
                        ]
                    }
                },
                order: [['price']]
            });

            return price.reduce((accum, item) => {
                const result =
                    accum.length === 5 ||
                    accum.find(x => x.price === item.price)
                        ? accum
                        : R.append(item, accum);
                return result;
            }, []);
        },
        urlList: async arg => {
            return await models.itemUrl.findAll({
                where: { itemId: arg.id },
                order: [['itMain', 'DESC']]
            });
        }
    },
    Price: {
        itemUrl: async ({ itemUrlId }) =>
            await models.itemUrl.find({
                where: { id: itemUrlId }
            })
    },
    Query: {
        items: async (__, arg) =>
            await models.item.findAll(
                R.pipe(
                    runIf(arg.limit !== undefined)(o =>
                        R.assoc('limit', arg.limit, o)
                    ),
                    runIf(arg.offset !== undefined)(o =>
                        R.assoc('offset', arg.offset, o)
                    )
                )({
                    where: R.pipe(R.dissoc('limit'), R.dissoc('offset', R.__))(
                        arg
                    ),
                    order: ['orderNumber']
                })
            ),
        itemPrices: async (__, arg) =>
            await models.itemPrice.findAll({
                where: arg,
                order: [['date', 'DESC']]
            }),
        itemUrls: async (__, arg) =>
            await models.itemUrklfindAll({
                where: arg,
                order: [['itMain', 'DESC']]
            }),
        item: async (__, arg) =>
            await models.item.find({
                where: arg
            })
    },
    Mutation: {
        item: async (__, arg) => {
            const result = await update(models.item, arg);
            arg.id && (await updateOrderNumber(result));

            return result;
        },
        itemPrice: async (__, arg) => await update(models.itemPrice, arg),
        itemUrl: async (__, arg) => await update(models.itemUrl, arg)
    }
};

module.exports = resolvers;
