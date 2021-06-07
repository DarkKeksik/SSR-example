const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

// При продакшен сборке добавляем оптимизацию проекта
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };

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

// DRY
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

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename("css")
        })
    ];

    if (isProd) {
        base.push( new BundleAnalyzerPlugin() );
    }

    return base;
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.jsx"]
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist")
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
    devtool: isDev ? "source-map" : ""
}