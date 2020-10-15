//导入自动生成html文件
const html = require('html-webpack-plugin');

//导入自动清除旧文件
const clean = require('clean-webpack-plugin');


//导入抽离css
const mini = require('mini-css-extract-plugin');


module.exports = {

    //模式
    mode: 'production'/* 'development' */,

    //源码地图
    /* devtool: 'source-map', */

    //出口配置
    output: {
        filename: 'js/[name]-[hash:7].js',
        publicPath:'../'
    },

    entry: {
        main: './src/js/index.js'
    },

    //插件配置
    plugins: [
        new html({
            template: './public/index.html',
            filename: 'html/index.html',
        }),
        new clean.CleanWebpackPlugin(),
        new mini({
            filename: 'css/[name]-[hash:3].css'
        }),
    ],

    //配置搭建服务器
    devServer: {
        port: 800,
        open: true,
        stats: { //配置控制输出
            modules: false,
            colors: true,
        },
        /* publicPath:'/', */
        openPage: '/html/index.html'
    },

    //配置模块
    module: {
        rules: [{
            test: /\.png$|\.jpg$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            }]
        }, {
            test: /\.less$/,
            use: [{
                    loader: mini.loader,
                },
                {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                }
            ]
        }]
    },


    stats: {
        modules: false,
        colors: true,
    },


};