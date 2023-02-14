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

- yarn add html-webpack-plugin@4.0.4 -D

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

- 1.修改了代码能自动帮我们重新构建
  - 	yarn webpack --watch , web pack wathc模式能实时监听文件变化，自动编译

- 2.浏览器能自动刷新显示最新的内容

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
  
    

在webpack.config.js文件中增加配置项devServer ：

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

  - 将浏览器的api请求代理到本地开发服务器，再由本地开发服务器代理请求到真正的api服务器。
  
### SourceMap

webpack自动编译的缺点：项目真正运行时运行的是打包后经过编译转换后的代码，出现了bug，不太方便定位bug在源码的哪里。

解决：SourceMap：源代码地图，定义了编译转换后的代码和源码之间的映射关系
通过sourcemap文件，可以逆向得到源代码

#### sourceMap文件主要属性：

- version：当前文件使用的sourcemap版本
- sources： [] ，转换之前的源文件是哪些
- names：源代码中使用的成员名称
- mappings： 转换之前和转换之后的字符之间的映射关系，采用xx编码
#### sourceMap文件的使用

项目文件结构：jquery-3.6.3.js是源文件，并没有在项目中使用



- ![截屏2023-02-14 下午3.06.36](/Users/neil/Library/Application Support/typora-user-images/截屏2023-02-14 下午3.06.36.png)
- 1.项目中index.html用到的是压缩文件 jquery.min.js
 ```js
  <body>
      <script src="jquery-3.6.3.min.js"></script>
  
      <script>
          const body = document.body;
          console.log(body);
      </script>
  </body>
 ```

- 2.在压缩文件代码最后面加上：

```js//# sourceMappingURL=jquery-3.6.3.min.map

//# sourceMappingURL=jquery-3.6.3.min.map

```

- 3.启动本地服务serve. ,你会发现项目中没用到的源代码也出现在了调试面板中。这样你在debug使用了压缩文件的页面时，你会发现你居然也可以在源文件中打断点进行调试

### webpack中配置sourceMap

#### devtool的souce-map模式

- devtool: "source-map"

  - 1.打包以后自动生成.map文件
  - 2.自动在压缩文件末尾添加一行 //# sourceMappingURL=压缩问价名

- 测试效果：

  - cd到打包输出目录, 运行一个服务serve .
  - 调出调试面板，这是可以在控制台log提示中直接点进去，定位到源代码出错的地方

  

webpack支持的生成sourceMap的方式有很多种（12种）

#### devtool的其他模式

##### eval模式

- eval是一个函数，可以运行js代码, 指定运行环境
  - 通过sourceURL指定eval函数里包的代码运行在哪里，这里运行在了bundle.js里，这只是一个标识![截屏2023-02-14 下午3.30.08](/Users/neil/Library/Application Support/typora-user-images/截屏2023-02-14 下午3.30.08.png)

- 缺点：devtool的eval模式，只能根据控制台的提示，定位错误出现在哪个文件

- devtool eval模式的实现原理：将每个模块的代码包在eval函数里执行，并在最后面用sourceURL指定运行环境的文件名（模块文件名）

  

###### 

