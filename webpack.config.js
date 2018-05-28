/*global process, __dirname*/

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const R = require('ramda');
const runIf = require('./src/helpers/logic/runIf');
const polyfills = require('./build/polyfills');
const analyzeBundle = false;
const combineStyles = true;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Replace = require('./build/replace');

//create folders
['public', 'public/assets', 'public/assets/js', 'public/assets/css'].forEach(
    folder => Replace.checkDir(path.resolve(__dirname, folder))
);

const JspReplace = new Replace({
    entry: path.resolve(__dirname, 'src/frontend/template', 'index.html'),
    output: path.resolve(__dirname, 'public', 'index.html')
});

const version = require('./build/version')();
const publicPath = '/assets';

JspReplace.replace('{version}', `${isDevelopment ? '' : '.v.' + version}`);

if (!isDevelopment) {
    ['public/assets/css', 'public/assets/js'].forEach(p => {
        fs.readdirSync(path.resolve(__dirname, p)).forEach(f => {
            if (f === '.gitkeep') return;
            fs.unlinkSync(`${p}/${f}`);
        });
    });
}

JspReplace.replace(
    '${link-path}',
    combineStyles
        ? ''
        : `<link async rel="stylesheet" href="${publicPath}/css/styles.min.v.${version}.css">`
);

JspReplace.replace('${js-path}', publicPath + '/js/');
JspReplace.save();

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            DEV: isDevelopment
        }
    }),
    new webpack.ProvidePlugin({
        $: 'jquery/dist/jquery.min.js',
        jQuery: 'jquery/dist/jquery.min.js',
        'window.jQuery': 'jquery/dist/jquery.min.js'
    }),
    !isDevelopment &&
        new ExtractTextPlugin('/css/styles.min.v.' + version + '.css'),
    isDevelopment && new webpack.NamedModulesPlugin(),
    // isDevelopment && new webpack.HotModuleReplacementPlugin(),
    analyzeBundle && new BundleAnalyzerPlugin({ analyzerMode: 'static' })
].filter(x => x !== false);

const minimizers = [
    !isDevelopment &&
        new UglifyJSPlugin({
            extractComments: {
                filename: ''
            },
            uglifyOptions: {
                compress: true
            }
        })
].filter(x => x !== false);

const entry = R.compose(
    runIf(true)(R.concat(polyfills)),
    //runIf(isDevelopment)(R.concat(['react-hot-loader/patch'])),
    R.concat([
        `./src/frontend/index${
            process.env.VIEW ? '.' + process.env.VIEW : ''
        }.jsx`
    ])
)([]).filter(x => x !== false);

const lessLoader =
    !isDevelopment && !combineStyles
        ? {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!less-loader',
                publicPath: '/assets/'
            })
        }
        : {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        };

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, 'public', 'assets/'),
        publicPath: '/assets/',
        filename: `js/bundle${isDevelopment ? '' : '.v.' + version}.js`
    },
    devtool: isDevelopment && 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src/frontend'),
            path.resolve(__dirname, 'src/frontend/components/')
        ],
        alias: {
            helpers: path.resolve(__dirname, 'src/helpers')
        }
    },
    optimization: {
        minimize: true,
        minimizer: minimizers
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            lessLoader,
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
            {
                test: /\.(png)?$/,
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    plugins: plugins
};
