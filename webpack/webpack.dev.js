const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');

const devConfig = {
    mode: 'development',
    output: {
        filename: 'index.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        hot: true,
        overlay: true,
        open: true,
        publicPath: '/',
        host: 'localhost',
        port: '1200',
        // 有需要代理的话 启用该配置
        // proxy: { 
        //   "/api": { // 以 '/api' 开头的请求，会跳转到下面的 target 配置
        //     target: "http://192.168.30.33:8080",
        //     pathRewrite: {
        //       "^api": "/mock/api"
        //     }
        // }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[hash].css',
        }),
        new webpack.NamedModulesPlugin(), // 更容易查看（patch）的以来
        new webpack.HotModuleReplacementPlugin() // 替换插件
    ]
}
module.exports = merge(config, devConfig);