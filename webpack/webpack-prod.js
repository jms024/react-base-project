const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { v1: uuidv1 } = require('uuid');

const fileVersion = uuidv1();

module.exports = (env, configDirs) => {
    const appTarget = env;
    return {
        entry: {
            main: ['@babel/polyfill', configDirs.SRC_DIR],
            scss: configDirs.SRC_DIR + '/main.scss'
        },
        output: {
            path: configDirs.BUILD_DIR,
            filename: `[name].${fileVersion}.js`
        },
        node: {
            fs: 'empty'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: "css-loader", // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader", // compiles Sass to CSS
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            } // translates CSS into CommonJS
                        },
                    ]
                }
            ]
        },
        optimization: {
            minimize: false,
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: `[name].${fileVersion}.css`,
                chunkFilename: `[id].${fileVersion}.css`
            }),
            new webpack.NormalModuleReplacementPlugin(/(.*)-APP_TARGET(\.*)/, function (resource) {
                resource.request = resource.request.replace(/-APP_TARGET/, `-${appTarget}`);
            }),
            new webpack.DefinePlugin({
                APP_TARGET: JSON.stringify(appTarget),
            })
        ]
    }
};