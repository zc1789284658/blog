---
title: webpack配置
date: 2019-06-25
tags: [webpack , js]
categories: [前端]
---

# 加载器（loader）
## file-loader
        webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的，这会导致图片引入失败。
    这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据配置修改打包后文件
    引用路径，使之指向正确的文件。

<!--more-->

## url-loader
        url-loader用于处理图片等静态资源，其中limit参数很重要，能将limit参数以下大小的文件转为base64编码以提供良好的性能
        {
            test:/\.(jpg|png|gif|jpeg|svg)$/, 
            loader:'url-loader?limit=40000' 
        }
## style-loader|css-loader|sass-loader|less-loader...
## babel-loader
## vue-loader+vue-template-compiler 
 
# 插件（plugins）
## CommonsChunkPlugin
    主要用来提取第三方库和公共模块，避免首屏加载的bundle过大或者按需加载的bundle体积过大，从而导致加载时间过长
### chunk的分类
- webpack中配置的entry chunk
- 入口文件以及他的依赖项通过code split分割出来的children chunk
- CommonsChunkPlugin创建出来的commons chunk

#### 不进行处理时会导致公共文件重复打包
- 分离出第三方库，自定义公共模块，webpack运行文件
```
new webpack.optimize.SplitChunksPlugin({
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        //打包重复出现的代码
        vendor: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0, // This is example is too small to create commons chunks
            name: 'vendor'
        },
        //打包第三方类库`
        commons: {
            name: "commons",
            chunks: "initial",
            minChunks: Infinity
        }
    }
})
```
# 自动更新（devServer）
    配置devServer
    {
        hot:true,
        inline:true,
        open:true
    }
# 异步加载
## require.ensure
    把js模块独立出一个个js文件，需要用的时候，创建script对象加载到document.head中
    ```
    document.onclick=()=>{
        require.ensure([],()=>{
            var a =require('./a.js')
            console.log(a.xx)
        }
        )
    }
    ```

# webpack.config.js目录结构
```
const pathlib = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageJson = require('./package.json')

module.exports={
    entry:{
        // test2:'./src/test2',
        main:'./src/test',
        // sleep:'./src/sleep',
        // useCss:'./src/use-css',
        // ts:'./ts/abstract.ts',
        // vendor:'vue'
    },
    output:{
        path:pathlib.resolve('dist'),
        filename:'[name].dist.js'
    },
    plugins:[
        // new Webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            // 自动将同级目录下js引入
            template:'./src/index.html',//参照物
            chunks:['common','main'], //主要用于多入口文件，当你有多个入口文件时，他就会编译生成多个打包
            inject:true  // 默认为true：将懒加载的js标签插入到body内最底层。body：将插入到body下，head：将插入到head中，false:一般不会用

        }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },
                //打包第三方类库`
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: Infinity
                }
            }
        })
    ],
    watch:true,              // 监听文件改动后自动编译
    mode:'development',
    devServer:{
        contentBase:pathlib.resolve('src'),
        port:8080,
        hot:true,
        historyApiFallback:true,
        compress:true,
        host:'localhost',
        open:true,
        inline:true
    },
    resolve:{
        extensions:['.ts','.tsx','.js'],
    },
    module:{
        rules:[
            {   
                test:/\.js$/,
                exclude:pathlib.resolve(__dirname,'node_modules'),
                // exclude:/node_modules/,
                use: {
                    loader: 'babel-loader',
                  }
            },
            {
                test:/\.css$/,
                use:'css-loader'
            },
            {
                test:/\.tsx?$/,
                use:'ts-loader'
            },
            // {          //npm i url-loader file-loader -D
            //     test:/\.(jpg|png|jpeg|gif|svg)$/,
            //     loader:'url-loader?limit=15000'
            // },
            // {
            //     test:/\./,
            //     loader:'file-loader'
            // },

            // {
            //     test:/\.css$/,
            //     loader:'style-loader!css-loader'
            // },
            // // less-loader|sass-loader|scss-loader
            

        ]
    }
}

```