const R = require('ramda');
const runIf = require('../../helpers/logic/runIf');
const fs = require('fs');
const config = require('../config.json');
const getStats = require('../../helpers/models/getStats');

const resolvers = {
    Query: {
        items: async (__, arg) => [],
        rootFolders: async () =>
            Object.keys(config.folders).reduce(async (accum, key) => {
                const stats = await getStats(config.folders[key]);
                return R.append(
                    {
                        name: key,
                        path: config.folders[key],
                        itFolder: true,
                        dateCreate: stats.birthtime,
                        size: stats.size
                    },
                    accum
                );
            }, [])
    }
};

module.exports = resolvers;
