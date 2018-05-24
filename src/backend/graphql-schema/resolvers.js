const R = require('ramda');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const getStats = require('../../helpers/models/getStats');
const pathItem = require('../../helpers/models/pathItem');
const itFolder = require('../../helpers/models/itFolder');
const toMB = require('../../helpers/models/toMB');

const resolvers = {
    Query: {
        items: async (__, arg) => {
            const fromDir = pathItem(arg.folder);

            return fs
                .readdirSync(arg.folder)
                .filter(x => x !== '.data')
                .map(async x => {
                    const path = fromDir(x);
                    const stats = await getStats(path);
                    return {
                        name: x,
                        path,
                        itFolder: itFolder(path),
                        dateCreate: stats.birthtime,
                        size: toMB(stats.size)
                    };
                });
        },
        rootFolders: async () =>
            Object.keys(config.folders).reduce(async (accum, key) => {
                const stats = await getStats(config.folders[key]);
                return R.append(
                    {
                        name: key,
                        path: config.folders[key],
                        itFolder: true,
                        dateCreate: stats.birthtime,
                        size: toMB(stats.size)
                    },
                    accum
                );
            }, [])
    }
};

module.exports = resolvers;
