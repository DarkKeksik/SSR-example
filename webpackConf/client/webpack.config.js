const path = require("path");

// Полезные функции
const optimization = require('../common').optimization;
const filename = require('../common/index.js').filename;
const cssLoaders = require('../common/index.js').cssLoaders;
const babelLoader = require('../common/index.js').babelLoader;
const plugins = require('../common/index.js').plugins;
const getPathForWebpack = require('../common/index.js').getPathForWebpack;
const isDev = process.env.NODE_ENV === "development";



module.exports = {
    context: path.resolve(__dirname, getPathForWebpack() ),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.jsx"]
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, getPathForWebpack("dist") )
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