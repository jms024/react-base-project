const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, configDirs) => {
    const appTarget = env;
    return {
        entry: {
            main: ['@babel/polyfill', configDirs.SRC_DIR],
            scss: configDirs.SRC_DIR + '/main.scss'
        },
        output: {
            path: configDirs.BUILD_DIR,
            filename: "[name].js"
        },
        devServer: {
            historyApiFallback: true,
            contentBase:
                configDirs.BUILD_DIR,
            port: 3000,
            hot: true,
            open: true
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
                            loader: "style-loader", // creates style nodes from JS strings
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            } // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }// compiles Sass to CSS
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
                },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
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
