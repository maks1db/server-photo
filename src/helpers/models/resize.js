const sharp = require('sharp');
const mime = require('mime-types');

const resize = (file, width) =>
    sharp(file)
        .resize(width)
        .toBuffer();

module.exports = async (file, size) => {
    const width = size === 'small' ? 150 : 700;

    return {
        type: mime.lookup(file),
        buffer: await resize(file, width)
    };
};
