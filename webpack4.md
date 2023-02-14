### Webpack4





默认打包入口文件:src/index.js
默认打包输出文件: dist/main.js

1. 先添加package.json文件管理各种node包：yarn init -y
2. 下载webpack: yarn add webpack@4.16.5 webpack-cli@3.3.11 -D
3. 启动webpack打包： yarn webpack

### 配置文件
- webpack.config.js
- 因为webpack是基于nodejs写的，因此webpack.config.js也遵守的是commonjs规范

```js
        let path = require("path")
        module.exports = {
            entry: "./src/main.js",
            // 修改出口文件名和文件路径
            // 默认出口：/dist/main.js
            output: {
                filename: "bundle.js",
                // 必须是绝对路径
                path: path.join(__dirname, "output")
            }
        }
```

### 新增工作模式-mode

#### 方式1

- yarn webpack --mode  production(默认)/development/none

- production: 会压缩代码

- development    

#### 方式1
·```js


```

   mode: "none",//这种模式什么也没做，方便看源码
  
```

### 不同类型资源模块加载

1. webpack默认只会打包js文件
2. 打包其他文件需要额外的加载器loader，加其他类型的文件转换成js文件
3. 转换成js里面，还需要额外loader
4. 如果某个类型的文件需要配置多个loader，因为loader的加载顺序是从下到上，那后面的loader要放在前面

#### 打包css文件：

- 1.yarn add css-loader@3.3.0 --dev: 将css文件转换成js文件
- 2.在webpack.config.js中添加

```js
   module: {
        // 针对其他资源的加载规则
        rules: [{
            test: /.css$/,
            use: "css-loader"
        }]
    }
```

- 3. yarn add style-loader@1.0.2 -D     :将js文件以style的形式载入到页面中

- 4.修改webpack.config.js：

  ```js
     module: {
          // 针对其他资源的加载规则
          rules: [{
              test: /.css$/,
    
            //style要放在前面
              use: ["style-loader", "css-loader"]
          }],
      }
  ```

#### 打包图片资源

- File-loader

```
  output: {
        filename: "bundle.js",
        // 必须是绝对路径
        path: path.join(__dirname, "output"),
        // 注意，加载图片资源的默认加载的是网站的根目录，但打包后的图片在网站的output/目录下
        publicPath: "output/"

    },
    
    {
            // 加载图片资源
            test: /\.(png|jpeg|jpg|gif)$/,
            use: "file-loader"
        }]
```

- Url-loader: 内置了file-loader，适合打包size较小的文件资源，减少网络请求
- Size较大的资源仍然用file-loader，减少打包文件大小

### loader和plugin的区别

- Loader打包除了js外其他类型的文件和资源

- 常用loader： style-loader,  css-loader/  file-loader url-loader/

- plugin能做loader做不到的事情

- loader只能在加载模块时工作，而plugin可以挂载在webpack compiler对象的各个生命周期钩子函数上

  

### Loader：

loader用于打包不同类型的资源和文件

webpack默认只打包js后缀名类型文件

### 	- 自定义loader

- 1.module.exports导出一个函数,参数传入的是文件字符串
- 2.导出函数return返回的必须是js代码，且代码内要用 export.defautl/module.exports导出
- 3.添加loader以后可以直接improt该文件,得到返回内容
  -  import my   from "./my.md"

### Plugin

yarn add xxxx@版本号 -D

#### - clean-webpack-plugin
- 每次打包前自动清理打包输出目录
#### - html-webpack-plugin
- 需求1:
	- 发布的时候要同时发布dist目录下的打包结果以及项目根目录下的html文件
	
	- 上线时还有html文件引入路径问题要修改
	   - 在开发阶段： src="dist/bundle.js"
	   - 上线阶段：src="bundle.js"
	- 修改html页面的title，设置meta标签属性 

使用html-webpack-plugin可以解决上述问题：
 - 工作原理： 他在打包目录下自动生成一个新的html文件，并且在构建过程中，自动将打包的bundle.js动态注入到html页面中
 - 可以自动生成也可以根据模版文件自动生成html文件(模版文件要放到src目录下某个地方)
 - 还可以生成多个html文件
#### - copy-webpack-plugin

- 需求2: 项目中不参与构建但是项目上线还是要用到的资源，比如favicon,怎么处理？
- 解决：用自动化copy-webpack-plugin的插件，打包时自动复制指定目录下的资源到打包输出目录
#### - 自定义plugin

- 挂载函数到在compiler的生命周期函数里实现扩展webpack的功能



### webpack工作环境问题

#### - 理想的webpack开发环境：

- 修改了代码能自动帮我们重新构建
  - 	yarn webpack --watch , web pack wathc模式能实时监听文件变化，自动编译

- 浏览器能自动刷新显示最新的内容

  - 不要用serve启动http服务， 每次启动都要serve . 然后手动点刷新

  - 用brower-sync启动

    - yarn add browser-sync -D
    - yarn browser-sync output --files "\**/\*"

- 提供Source Map支持，运行过程中一旦出现错误，能快速定位到原代码，方便调试

#### - webpack Dev Server

- 内部集成了自动编译和自动刷新浏览器功能

  - yarn add webpack-dev-server@3.11.3 -D
  - yarn webpack-dev-server
  - 注意：使用webpack Dev Server打包的内容并没有放到（磁盘中）打包输出目录中而是直接放到了内存中，从内存中读取省掉了磁盘读写操作，大大提高了启动效率

  

##### - devServer ：

###### - contentBase：

- 作用：访问构建时不需要而没有打包到打包输出目录里，但实际运行时需要的额外资源。
- 问题：copy-webpack-plugin不是copy了额外资源到打包输出目录里？

​                  copy-webpack-plugin最好只在上线前一次开发中用，开发过程中最好不要用，因为开发过程中构建是很频繁的，每次都进行copy操作，会比较消耗时间。

在web pack.config.js文件中：

 ```js
   devServer: {
         // 即dev server打包不进去的资源，但是实际又需要的资源，真正运行时要如何访问到？
         // contentBase指定额外的静态资源访问路径
         // 实际开发阶段时替代copy-webpack-plugin的更好的选择
         contentBase: "./src/public"
     },
 ```

###### - proxy：

问题：解决开发阶段跨域问题

生产阶段：项目和api都会部署到同源地址上，不会有跨域问题

但是开发阶段：项目运行在 localhost:8080上，API放在实际的服务器上，这里就会有跨域问题。

解决：

- 使用CORS？服务器api要支持这个功能，但是实际情况是并不是每个api都支持CORS

  并且如果前后端同源部署的话，api也完全没必要开启CORS

- 使用代理：

  跨域问题是浏览器和服务器之间的问题，服务器和服务器之间访问没有跨域问题

  - 将浏览器的api请求代理到本地开发服务器，再由本地开发服务器代理请求到真正的api服务器







​    





