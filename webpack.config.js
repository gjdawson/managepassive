var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
        //publicPath: path.resolve(APP_DIR, '../')
    },
    resolve: {
        extensions: ['', '.react.js', '.js', '.jsx', '.scss', '.json'],
        modulesDirectories: [
            "web_modules", "app", "node_modules"
        ]
    },

    node: {


        dns: "empty",

        fs: "empty",
        net: "empty",
        tls: "empty"
    },

    externals: {
        fs: '{}',
        tls: '{}',
        net: '{}',
        dns: '{}',
        amqplib: '{}'
        // console: '{}'
    },

    context: APP_DIR + '/static',

    plugins: [
        new CopyWebpackPlugin([
            {from: 'index.html'},
            {from: 'assets/', to: 'assets/'}
        ],
            {
                copyUnmodified: true
            })
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files

                include: [
                    APP_DIR,
                    path.resolve(__dirname, 'node_modules', 'aether-client-js')
                ],
                loader: "babel-loader",
                query: {
                    presets: ['es2015','react']
                }
            },
            //{
            //    test: /\.js$/,
            //
            //}
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};

config.devtool = 'source-map';
config.devServer = {
    contentBase: path.resolve(APP_DIR, '../')
};

config.externals['react/lib/ExecutionEnvironment'] = true
config.externals['react/lib/ReactContext'] = true
config.externals['react/addons'] = true
module.exports = config;
