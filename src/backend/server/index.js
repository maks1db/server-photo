/*global __dirname, process */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('../routes');
const app = express();
const mainConfig = require('../../../package.json');
const config = require('../config.json');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('../graphql-schema');

const serveStatic = () =>
    app.use(
        '/assets',
        express.static(path.join(__dirname, '../../../public/assets'))
    );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    '/robots.txt',
    express.static(path.join(__dirname, '../../../public/robots.txt'))
);
app.use(
    '/sitemap.xml',
    express.static(path.join(__dirname, '../../../public/sitemap.xml'))
);
app.use(
    '/favicon.ico',
    express.static(path.join(__dirname, '../../../public/favicon.ico'))
);
if (config.serveStatic && process.env.NODE_ENV !== 'development') {
    serveStatic();
}

if (process.env.NODE_ENV === 'development') {
    serveStatic();

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Methods',
            'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        } else {
            return next();
        }
    });
}

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use('', routes);
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../../../public/', 'index.html'));
});

app.listen(config.port, () => {
    console.log(`Server ${mainConfig.name} on ${config.port}`);
});

module.exports = app;
