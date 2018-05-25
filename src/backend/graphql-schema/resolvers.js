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
    },
    Mutation: {
        createFolder: async (__, arg) => {
            const { folder, name } = arg;

            if (fs.existsSync(path.resolve(folder, arg.name))) {
                return {};
            }

            const result = path.resolve(folder, name);
            fs.mkdirSync(result);
            const stats = await getStats(result);

            return {
                name,
                path: result,
                itFolder: itFolder(result),
                dateCreate: stats.birthtime,
                size: toMB(stats.size)
            };
        },
        renameItem: async (__, arg) => {
            const { file, name } = arg;
            const itFolder = itFolder(file);

            const basename = path.basename(file);
            const type = itFolder ? '' : basename.split('.')[1];
        },
        copyItem: async (__, arg) => {}
    }
};

module.exports = resolvers;
