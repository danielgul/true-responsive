var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var pathsToClean = [
    'dist',
    'temp'
]

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        main: './index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './js/[name].js',
        hotUpdateMainFilename: "../temp/[hash].hot-update.json",
        hotUpdateChunkFilename: "../temp/[id].[hash].hot-update.js"
    },
    resolve: {
        alias: {
            html_src: path.resolve(__dirname, 'src/html/'),
            html_layout: path.resolve(__dirname, 'src/html/gen_layout/'),
            html_dev_tools: path.resolve(__dirname, 'src/html/dev_tools/'),
            scss_src: path.resolve(__dirname, 'src/scss/'),
            img_src: path.resolve(__dirname, 'src/assets/images/'),
            fonts_src: path.resolve(__dirname, 'src/assets/fonts/')
        }
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style",
                    use: [{
                            loader: "css",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass",
                            options: {
                                sourceMap: true,
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                })
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html',
                    options: {
                        interpolate: 'require',
                        minimize: false,
                        collapseWhitespace: false
                    }
                }]
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'svg-inline',
                    options: {
                        classPrefix: 'svg-',
                        idPrefix: 'svg-'
                    }
                }, ]
            },
            {
                test: /\.jpg$/,
                use: [{
                    loader: "file",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff)$/,
                use: [{
                    loader: "file",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './html/index.html'
        }),
        new HtmlBeautifyPlugin({
            config: {
                html: {
                    end_with_newline: true,
                    indent_size: 2,
                    indent_with_tabs: true,
                    indent_inner_html: true,
                    preserve_newlines: true,
                    unformatted: ['p', 'i', 'b', 'span']
                }
            }
        }),
        new ExtractTextPlugin('css/main.css'),
        new WriteFilePlugin(),
        new CleanWebpackPlugin(pathsToClean),
    ],
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        compress: true,
        port: 1337
    }
};