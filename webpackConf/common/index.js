const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;


// При продакшен сборке добавляем оптимизацию проекта
const optimization = () => {

    const config = {
        splitChunks: {
            chunks: "all"
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

// Функция, которая добавляет hash при продакшен сборке
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        "css-loader"
    ]

    if ( extra ) {
        loaders.push( extra );
    }

    return loaders;
}

const babelLoader = preset => {
    let config = {
        loader: "babel-loader",
        options: {
            presets: [ "@babel/preset-env" ]
        }
    }

    if ( preset ) {
        config.options.presets.push( preset );
    }

    return config;
}

const plugins = ( isClientBuild = true ) => {
    const base = [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename("css")
        })
    ];

    isProd && base.push( new BundleAnalyzerPlugin() );
    isClientBuild && base.push(
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        })
    )

    return base;
}

const getPathForContext = (
    buildForClient = true
) => buildForClient ? '../../client/src' :  '../../server';

const getPathForOutput = (
    buildForClient = true
) => buildForClient ? '../../build/client/src' :  '../../build/server';

module.exports = {
    optimization,
    filename,
    cssLoaders,
    babelLoader,
    plugins,
    getPathForContext,
    getPathForOutput
}