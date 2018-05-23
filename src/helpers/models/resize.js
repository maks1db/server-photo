const sharp = require('sharp');
const itIMG = require('./itIMG');
const runIf = require('../logic/runIf');
const fs = require('fs');
const path = require('path');

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

const resize = (file, width) =>
    sharp(file)
        .resize(width)
        .toBuffer();

module.exports = async (file, size) => {
    const name = path.basename(file);
    const type = mime[name.split('.')[1].toLowerCase()];
    const width = size === 'small' ? 150 : 700;

    return {
        type,
        buffer: await resize(file, width)
    };
};
