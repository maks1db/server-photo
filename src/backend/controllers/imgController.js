const resize = require('../../helpers/models/resize');

module.exports.get = async (req, res) => {
    const { path, size } = req.query;

    const result = await resize(path, size);
    res.writeHead(200, { 'Content-Type': result.type });
    res.end(result.buffer, 'binary');
};
