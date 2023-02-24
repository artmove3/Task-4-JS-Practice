const path = require('path')
const webpack = require('webpack')


const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        // contentBase: path.join(__dirname, 'dist'),

        port: 8000,
        hot: isDev,
        open: true

    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html', 
            filename:'./index.html',
            inject: true,
            minify: {
                collapseWhitespace: isProd
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery",
        }),

    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    }
}

