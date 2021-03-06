const path = require("path");
const isDev = process.env.NODE_ENV === "development";

// Useful functions
const optimization = require('../common').optimization;
const filename = require('../common/index.js').filename;
const cssLoaders = require('../common/index.js').cssLoaders;
const babelLoader = require('../common/index.js').babelLoader;
const plugins = require('../common/index.js').plugins;
const getPathForContext = require('../common/index.js').getPathForContext;
const getPathForOutput = require('../common/index.js').getPathForOutput;


module.exports = {
    target: 'web',
    context: path.resolve(__dirname, getPathForContext() ),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.jsx"]
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, getPathForOutput() )
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
    plugins: plugins(),
    devServer: {
        port: 8080,
        hot: isDev
    },
    optimization: optimization(),
    devtool: isDev ? "source-map" : undefined
}