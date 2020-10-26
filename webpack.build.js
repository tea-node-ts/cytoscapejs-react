const path = require('path')
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')
const common = require('./webpack.common.js');


module.exports = merge(common, {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'cytoscapejs-react',
        libraryTarget: 'umd',
    },
    devtool: 'inline-source-map',
    externals: [nodeExternals()]
});
