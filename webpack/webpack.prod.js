const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const config = require('./webpack.config.js');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name]_[hash].js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath : "//js.cdn.com/id/", // 指定存放JavaScript 文件的 CDN 目录 URL
    },
    module: {
        rules: [
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                    {
                        loader:  MiniCssExtractPlugin.loader,
                        options: {
                            // publicPath: "//img.cdn.com/id/ ", // 指定存放 CSS 中导入的资源（例如图片）的 CDN 目录 URL
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer')(),
                                // 这里可以使用更多配置，如上面提到的 postcss-cssnext 等
                                // require('postcss-cssnext')()
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({}),
        new MiniCssExtractPlugin({
            filename: '[name]_[hash].css',
        }),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
    ]
}
module.exports = merge(config, prodConfig);