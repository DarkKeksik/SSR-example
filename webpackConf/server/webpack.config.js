const path = require("path");

// Useful functions
const getPathForContext = require('../common/index.js').getPathForContext;
const getPathForOutput = require('../common/index.js').getPathForOutput;
const babelLoader = require('../common/index.js').babelLoader;
const cssLoaders = require('../common/index.js').cssLoaders;
const plugins = require('../common/index.js').plugins;


module.exports = {
    target: 'node',
    node: {
        __dirname: true
    },
    context: path.resolve( __dirname, getPathForContext(false) ),
    mode: "development",
    entry: {
        server: ["@babel/polyfill", "./server.js"]
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, getPathForOutput(false ) )
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders("sass-loader")
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: babelLoader()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: babelLoader("@babel/preset-typescript")
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: babelLoader("@babel/preset-react")
            }
        ]
    },
    plugins: plugins( false )
}