const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    // 在这里配置 alias
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '../src/')
        },
        extensions: [".js", ".json"]
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
            // html-loader 不能与 html-webpack-plugin 一起使用，
            // html-loader 会导致默认ejs模版引起语法解析失效，造成${} <%= = %>等语法不生效  
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // }, 
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }],
                exclude: /(node_modules|bower_components)/,
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                include: [path.resolve(__dirname, '../src/')],
                use: ["file-loader", {
                    loader: "image-webpack-loader",
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        optipng: {
                            enabled: false
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false
                        },
                        webp: {
                            quality: 75
                        }
                    }
                }, ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: [path.resolve(__dirname, '../src/')],
                use: ['file-loader']
            }
        ],
        noParse: content => /jquery|lodash/.test(content)
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack-Starter Index Template", // 生成的文件标题
            filename: "index.html", // 最终生成的文件名
            template: "./src/index.html",
            minify: { // 压缩选项
                collapseWhitespace: true, // 移除空格
                removeComments: true, // 移除注释
                removeAttributeQuotes: true, // 移除双引号
                html5: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
            }
        }),
    ]
}