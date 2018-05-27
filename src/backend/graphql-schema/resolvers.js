const R = require('ramda');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const getStats = require('../../helpers/models/getStats');
const pathItem = require('../../helpers/models/pathItem');
const itFolder = require('../../helpers/models/itFolder');
const itIMG = require('../../helpers/models/itIMG');
const toMB = require('../../helpers/models/toMB');
const copyItem = require('../../helpers/models/copyItem');
const sort = require('sort-by');

const resolvers = {
    Query: {
        items: async (__, arg) => {
            const fromDir = pathItem(arg.folder);

            return fs
                .readdirSync(arg.folder)
                .filter(x => R.pipe(fromDir, _ => itIMG(_) || itFolder(_))(x))
                .map(x => {
                    const path = fromDir(x);
                    const stats = getStats(path);
                    return {
                        name: x,
                        path,
                        itFolder: itFolder(path),
                        dateCreate: stats.birthtime,
                        size: toMB(stats.size)
                    };
                })
                .sort(sort('-itFolder', 'name'));
        },
        rootFolders: async () =>
            Object.keys(config.folders).reduce((accum, key) => {
                const stats = getStats(config.folders[key]);
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
            const stats = getStats(result);

            return {
                name,
                path: result,
                itFolder: true,
                dateCreate: stats.birthtime,
                size: toMB(stats.size)
            };
        },
        renameItem: async (__, arg) => {
            const { file, name } = arg;

            const basename = path.basename(file);
            const type = path.extname(file);
            const folder = file.replace(basename, '');

            const newFile = path.resolve(folder, name + type);
            if (fs.existsSync(newFile)) {
                return {};
            }

            fs.renameSync(file, newFile);
            const stats = getStats(newFile);
            return {
                name: name + type,
                path: newFile,
                itFolder: itFolder(newFile),
                dateCreate: stats.birthtime,
                size: toMB(stats.size)
            };
        },
        copyItems: async (__, arg) => {
            const { files, folder } = arg;

            return files.map(async file => {
                const basename = path.basename(file);
                const type = path.extname(file);

                const exists = fs.existsSync(path.resolve(folder, basename));
                const newFile = exists
                    ? basename.replace(type, '') +
                      `_${new Date().valueOf()}${type}`
                    : basename;

                copyItem(file, path.resolve(folder, newFile));

                const result = path.resolve(folder, newFile);
                const stats = getStats(result);

                return {
                    name: path.basename(result),
                    path: result,
                    itFolder: itFolder(result),
                    dateCreate: stats.birthtime,
                    size: toMB(stats.size)
                };
            });
        },
        moveItems: async (__, arg) => {
            const { files, folder } = arg;

            const result = files.map(async file => {
                const basename = path.basename(file);
                const type = path.extname(file);

                const exists = fs.existsSync(path.resolve(folder, basename));
                const newFile = exists
                    ? basename.replace(type, '') +
                      `_${new Date().valueOf()}${type}`
                    : basename;

                copyItem(file, path.resolve(folder, newFile));

                const result = path.resolve(folder, newFile);
                const stats = getStats(result);

                return {
                    name: path.basename(result),
                    path: result,
                    itFolder: itFolder(result),
                    dateCreate: stats.birthtime,
                    size: toMB(stats.size)
                };
            });

            files.forEach(x => fs.unlinkSync(x.path));
            return result;
        },
        deleteItem: async (__, arg) => {
            const { file } = arg;
            fs.unlinkSync(file);

            return 'ok';
        }
    }
};

module.exports = resolvers;
