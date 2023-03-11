### Webpack4

需要注意的地方：

webpack 打包时，js 文件只能 require+module.exports/import+export.default

默认打包入口文件:src/index.js
默认打包输出文件: dist/main.js

1. 先添加 package.json 文件管理各种 node 包：yarn init -y
2. 下载 webpack: yarn add webpack@4.16.5 webpack-cli@3.3.11 -D
3. 启动 webpack 打包： yarn webpack

### 配置文件

- webpack.config.js
- 因为 webpack 是基于 nodejs 写的，因此 webpack.config.js 也遵守的是 commonjs 规范

```js
let path = require("path");
module.exports = {
  entry: "./src/main.js",
  // 修改出口文件名和文件路径
  // 默认出口：/dist/main.js
  output: {
    filename: "bundle.js",
    // 必须是绝对路径
    path: path.join(__dirname, "output"),
  },
};
```

### mode

三种值：none，production，development

#### - none： 什么也没做，方便看源码

#### - production：默认 mode

自动开启很多打包优化: 代码压缩+tree-shaking（标记+代码压缩去除冗余代码）+启动 definePlugin 注入全局变量

##### 1.自动使用了内置插件 definePlugin，为代码注入全局成员 process.env.NODE_ENV:

definePlugin： 内置插件，定义的变量可以在 webpack 打包范围内任意 javascript 环境内访问,甚至在项目根目录之外的 js 里也可以使用(`前提是这个js被项目引用`)

```js
new webpack.DefinePlugin({
  API_BASE_URL: "https://api.exampe.com",
});
```

##### 2.自动开启 tree-shaking：移除未引用的代码，去除冗余代码，优化打包体积

tree-shaking 是一种多种功能搭配使用效果

非 production mode 如何开启 tree-shaking 呢？

```js
//optimizaiton： 集中配置webpack优化功能选项
optimizaiton: {
  usedExports: true; // 标记使用了的代码
  minimize: true; //压缩未标记的代码
}
```

#### - development：

方式 1

- yarn webpack --mode production(默认)/development/none

方式 2: webpack.config.js 配置文件中

```

   mode: "none",//这种模式什么也没做，方便看源码

```

### Loader

loader 用于打包不同类型的资源和文件

因为 webpack 默认只打包 js 后缀名类型文件

- 不同类型资源模块加载

1. webpack 默认只会打包 js 文件
2. 打包其他文件需要额外的加载器 loader，加其他类型的文件转换成 js 文件
3. 转换成 js 里面，还需要额外 loader
4. 如果某个类型的文件需要配置多个 loader，因为 loader 的加载顺序是从下到上，那后面的 loader 要放在前面

#### - 打包 css 文件：

- 1.yarn add css-loader@3.3.0 --dev: 将 css 文件转换成 js 文件
- 2.在 webpack.config.js 中添加

```js
module: {
  // 针对其他资源的加载规则
  rules: [
    {
      test: /.css$/,
      use: "css-loader",
    },
  ];
}
```

- 3. yarn add style-loader@1.0.2 -D :将 js 文件以 style 的形式载入到页面中

- 4.修改 webpack.config.js：

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

#### - 打包图片资源

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

- Url-loader: 内置了 file-loader，适合打包 size 较小的文件资源，减少网络请求
- Size 较大的资源仍然用 file-loader，减少打包文件大小

#### - 代码转译

- yarn add babel-loader@8.0.0 @babel/core@7.1 @babel/preset-env@7.1 -D

  ```js
      // 3.转译高版本代码，兼容各个浏览器，有些浏览器还未支持语言的最新特性
              {
                  test: /\.js$/,
                  exclude: /node-module/,
                  use: {
                      loader: "babel-loader?cacheDirectory",
                      options: {
                        <!-- @babel/preset-env只是babel预设中的一个preset -->
                          presets: ['@babel/preset-env']
                      }
  
                  }
             }
  ```

#### - css 兼容浏览器

- postcss-loader / postcss-preset-env/autoprefixer 样式前缀处理，放在其他处理 css 文件的其他 loader 最前面

#### - 自定义 loader

loader 是导出为一个函数的 node 模块

- 1.module.exports 导出一个函数,参数传入的是文件的字符串
- 2.导出的函数 return 返回是 js 代码或者 source map，
  - loader 可以被链式调用意味着不一定要输出 JavaScript。只要下一个 loader 可以处理这个输出，这个 loader 就可以返回任意类型的模块。
- 3.添加 loader 以后可以直接 improt 该文件,得到返回内容
  - import my from "./my.md"

##### 1. 自定义 css-loader

- css-loader 的作用，将一个 css 文件转换成一个 js 数组对象

### Plugin

yarn add xxxx@版本号 -D

#### - clean-webpack-plugin

- clean-webpack-plugin": "^4.0.0

- 每次打包前自动清理打包输出目录

#### - html-webpack-plugin

- yarn add html-webpack-plugin@4.0.4 -D

- 需求 1:

  - 发布的时候要同时发布 dist 目录下的打包结果以及项目根目录下的 html 文件

  - 上线时还有 html 文件引入路径问题要修改
    - 在开发阶段： src="dist/bundle.js"
    - 上线阶段：src="bundle.js"
  - 修改 html 页面的 title，设置 meta 标签属性

使用 html-webpack-plugin 可以解决上述问题：

- 工作原理： 他在打包目录下自动生成一个新的 html 文件，并且在构建过程中，自动将打包的 bundle.js 动态注入到 html 页面中
- 可以自动生成也可以根据模版文件自动生成 html 文件(模版文件要放到 src 目录下某个地方)
- 还可以生成多个 html 文件

#### - copy-webpack-plugin

- 需求 2: 项目中不参与构建但是项目上线还是要用到的资源，比如 favicon,怎么处理？
- 解决：用自动化 copy-webpack-plugin 的插件，打包时自动复制指定目录下的资源到打包输出目录

#### - 自定义 plugin

- 挂载函数到在 compiler 的生命周期函数里实现扩展 webpack 的功能

### webpack 工作环境问题

#### - 理想的 webpack 开发环境：

- 1.修改了代码能自动帮我们重新构建

  -     yarn webpack --watch , web pack watch模式能实时监听文件变化，自动编译

- 2.浏览器能自动刷新显示最新的内容

  - 不要用 serve 启动 http 服务， 每次启动都要 serve . 然后手动点刷新

  - 用 brower-sync 启动

    - yarn add browser-sync -D
    - yarn browser-sync output --files "\*\*/\*"

- 提供 Source Map 支持，运行过程中一旦出现错误，能快速定位到原代码，方便调试

#### - webpack Dev Server

- 内部集成了自动编译和自动刷新浏览器功能

  - yarn add webpack-dev-server@3.11.3 -D

  - yarn webpack-dev-server

  - 注意：使用 webpack Dev Server 打包的内容并没有放到（磁盘中）打包输出目录中而是直接放到了内存中，从内存中读取省掉了磁盘读写操作，大大提高了启动效率

在 webpack.config.js 文件中增加配置项 devServer ：

###### - contentBase：

- 作用：访问构建时不需要而没有打包到打包输出目录里，但实际运行时需要的额外资源。
- 问题：copy-webpack-plugin 不是 copy 了额外资源到打包输出目录里？

copy-webpack-plugin 最好只在上线前一次开发中用，开发过程中最好不要用，因为开发过程中构建是很频繁的，每次都进行 copy 操作，会比较消耗时间。

在 web pack.config.js 文件中：

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

生产阶段：项目和 api 都会部署到同源地址上，不会有跨域问题

但是开发阶段：项目运行在 localhost:8080 上，API 放在实际的服务器上，这里就会有跨域问题。

解决：

- 使用 CORS？服务器 api 要支持这个功能，但是实际情况是并不是每个 api 都支持 CORS

  并且如果前后端同源部署的话，api 也完全没必要开启 CORS

- 使用代理：

  跨域问题是浏览器和服务器之间的问题，服务器和服务器之间访问没有跨域问题

  - 将浏览器的 api 请求代理到本地开发服务器，再由本地开发服务器代理请求到真正的 api 服务器。

### HMR

- hot module replacement，模块热替换

devServer 自刷新也有问题：浏览器页面重新刷新后，页面状态丢失，比如你提交表单的，表单那些数据浏览器刷新以后就会丢失，要重新填写。

更好的体验：在页面不刷新的前提下，模块也能即使更新

比如 HMR：在应用运行状态下实时替换模块，应用状态不会丢失。

#### 为什么要有热更新？

为了在页面状态不丢失的前提下，也能更新页面

#### 如何用？

使用方式 1:

webpack-dev-server 集成了 HMR 功能： yarn webpack-dev-server --hot

方式 2:

```js
devServer:{
  hot:true;  //打开HMR
}
//添加内部集成的热更新插件
new webapck.HotModuleReplacementPlugin(),

```

#### HMR API

HMR 存在的问题：

已经开启热更新了，修改 css 文件，可以及时热更新，但是如果修改的是 js 文件，则还是自刷新，浏览器重新刷新了，why？

style-loader 对 css 文件做了热更新处理，而 js 文件需要我们手动处理一下。

如何解决？

- HMR 插件为 js 提供了一套处理 HMR 的 api。

- 在使用了这个更新的模块的文件里(导入这个模块模块里)，处理它所依赖的模块更新过后的热替换逻辑

  ```js
  devServer:{
  hot:true; //1.开启热更新
  }
  
  <!--  2. 手动处理js/图片等模块的热更新处理-->
  
  // 手动处理js模块热替换
  // module.hot： module对象是HotModuleReplacementPlugin插件注入的，使用了这个插件才会有
  if (module.hot) {
    module.hot.accept("./editor", () => {
      console.log("editord更新，这里需要手动处理");
      // 1.先保存旧元素的内容
      const oldContent = oldEditor.innerHTML;
      //  2.移除旧元素
      document.body.removeChild(oldEditor);
      //  3.重新创建元素
      let newEditor = createEditor();
      newEditor.innerHTML = oldContent;
      // 4.
      document.body.insertBefore(newEditor, img);
      // 5.
      oldEditor = newEditor;
    });
  }
  
  ```

#### HMR API 的使用问题

1. HMR API,即 module.hot.accept 是 HotModuleReplacementPlugin 提供的，因此要使用 HMR API 前要先注册插件
2. HMR API 里面的代码出现错误时候导致浏览器会重新刷新，错误信息被覆盖掉，开发者难以察觉到代码哪里醋出错了，解决：使用 hotOnly: true。 开启热更新同时关闭自刷新
3. 热替换代码会被打包到打包文件里么？
   1. 把热替换处理逻辑包在 if(module.hot) 里，在生产环境下关闭掉热替换， 并移除热替换插件，这样，这块代码就不会被打包进来

### SourceMap

webpack 自动编译的缺点：项目真正运行时运行的是打包后经过编译转换后的代码，出现了 bug，不太方便定位 bug 在源码的哪里。

解决：SourceMap：源代码地图，定义了编译转换后的代码和源码之间的映射关系
通过 sourcemap 文件，可以逆向得到源代码

#### sourceMap 文件主要属性：

- version：当前文件使用的 sourcemap 版本
- sources： [] ，转换之前的源文件是哪些
- names：源代码中使用的成员名称
- mappings： 转换之前和转换之后的字符之间的映射关系，采用 xx 编码

#### sourceMap 文件的使用

项目文件结构：jquery-3.6.3.js 是源文件，并没有在项目中使用

- ![截屏2023-02-14 下午3.06.36](https://tva1.sinaimg.cn/large/008vOhrAgy1hbkp70wegvj30ea080t92.jpg)

- 1.项目中 index.html 用到的是压缩文件 jquery.min.js

```js
<body>
  <script src="jquery-3.6.3.min.js"></script>

  <script>const body = document.body; console.log(body);</script>
</body>
```

- 2.在压缩文件代码最后面加上：

```js//# sourceMappingURL=jquery-3.6.3.min.map

//# sourceMappingURL=jquery-3.6.3.min.map

```

- 3.启动本地服务 serve. ,你会发现项目中没用到的源代码也出现在了调试面板中。这样你在 debug 使用了压缩文件的页面时，你会发现你居然也可以在源文件中打断点进行调试

#### webpack devtool 中配置 sourceMap

##### devtool 的 souce-map 模式

- devtool: "source-map"

  - 1.打包以后自动生成.map 文件
  - 2.自动在压缩文件末尾添加一行 //# sourceMappingURL=压缩问价名

- 测试效果：

  - cd 到打包输出目录, 运行一个服务 serve .
  - 调出调试面板，这是可以在控制台 log 提示中直接点进去，定位到源代码出错的地方

webpack 支持的生成 sourceMap 的方式有很多种（12 种）

##### devtool 的其他模式

eval-_ ：使用 eval 生成 source map , 不会生成额外的 .map 文件， 而是在 eval 函数内附加 source map 。 推荐用于开发环境， 因为_ 相对来说构建和热更新都比较快。

inline-\* ： 将 SourceMap 内联到原始文件中，同样 不会生成额外的 .map 文件。

hidden-\* ：addition 会生成 source map 但是不会将其关联， 也就是不会在编译后的代码内添加上面提到的那个映射语句。

nosources-\* ：sourcemap 中不带源码， 但会有准确的错误行列信息， 避免源码泄露。

cheap-\* ： 忽略列信息，source map 只有行映射，可以加快打包速度

cheap-module-\* ： moudle 关键子一定是跟 cheap 一起使用的， 表示所映射的阶段， 如果没有 module 映射的是 loader 处理后的代码信息，如果加了 module 那就是 loader 处理前的源码， 举个例子， `const a = 1` 这行， 如果没加 module 那拿到的就是转为 es5 的 `var a = 1`, 如果加了 module , 那拿到的就是 `const a = 1`

##### eval 模式

- eval 是一个函数，可以运行 js 代码, 指定运行环境

  - 通过 sourceURL 指定 eval 函数里包的代码运行在哪里，这里运行在了 bundle.js 里，这只是一个标识![截屏2023-02-14 下午3.30.08](/Users/neil/Library/Application Support/typora-user-images/截屏 2023-02-14 下午 3.30.08.png)

- 缺点：devtool 的 eval 模式，只能根据控制台的提示，定位错误出现在哪个文件

- devtool eval 模式的实现原理：将每个模块的代码包在 eval 函数里执行，并在最后面用 sourceURL 指定运行环境的文件名（模块文件名）

#### devtool 其他模式对比

- webpack 配置对象，可以是一个对象，也可以是一个数组（数组里多个对象，每个都是独立的打包任务），还可以是个函数

- 开发阶段： cheap-module-eval-source-map,缺点首次打包慢
- 发布阶段：none； 不生成 sourceMap， sourceMap 会暴露源代码

### webpack 不同环境下的配置

- 开发环境我们更注重开发效率，生产环境更注重运行效率

- 建议：为不同的环境创建不同的配置
  webpack 配置文件支持导出对象，也支持导出函数
  - 导出函数时，会传进来两个参数
    - env : 通过 cli 传进来的环境参数
    - argv：通过 cli 传进来的所有参数

#### 1. 配置文件根据环境的不同导出不同的配置（只适合中小型项目）

- 导出函数

- 运行命令: yarn webpack --env pro， 根据传入的环境导出不同的配置

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Webpack = require("webpack");
// 中小型项目：在一个配置文件里根据环境的不同使用不同的配置
// 运行cli: yarn webpack / yarn webpack --env pro
module.exports = (env, argv) => {
  let config = {
    entry: "./src/main.js",
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
      open: true,
      hot: true,
      hotonly: true,
      // 开发mode打包额外静态资源
      contentBase: "./src/public/",
    },

    module: {
      // 针对其他资源的加载规则
      rules: [
        {
          // 1.加载css文件
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          // 2.加载图片资源
          test: /\.(png|jpeg|jpg|gif)$/,
          // use: "file-loader"
          use: {
            loader: "url-loader",
            options: {
              // <10kb- url-loader >10kb->file-laoder
              limit: 10 * 1024,
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new Webpack.HotModuleReplacementPlugin(),
    ],
  };
  if (env === "pro") {
    config.mode = "production";
    config.devtool = false;
    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      // 生产mode打包额外资源
      new CopyWebpackPlugin(["./src/public"]),
    ];
  }

  return config;
};
```

#### 2. 一个环境对应一个配置文件

适合于大型项目：不同环境对应不同的配置文件

一般有三个配置文件：

涉及到配置文件 merge 的问题：

    - 用assign merge两个对象时会有问题。assign merge两个对象时，如果对象里有数组属性，后面的那个会直接覆盖掉前面的那一整个数组。而webpack配置文件merge我们想要的效果是，往数组里新增加一些其他的东西

- 推荐使用专业的 webpack mergem 模块，使用 webpack-merge 模块:yarn add webpack-merge -D
- 使用 lodash 的 merge 方法

运行命令: yarn webpack --config webpack-prod.js

```js
const common = require("./webpack-common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    // 生产mode打包额外资源
    new CopyWebpackPlugin(["public"]),
  ],
});
```

### webpack 优化构建结果

#### webpack 性能分析插件

- speed-measure-webpack-plugin

  用它的 wrap 方法包裹整个 webpack 配置项，可以看到每个 loader 和 plugin 的耗时状况

- webpack-bundle-analyzer

  每个 bundle 里面包含了什么模块，体积多大

在一些性能开销较大的 loader 之前添加此`cache-loader`

对`babel-loader`使用缓存，也可以不借助`cache-loader`，直接在`babel-loader`后面加上`?cacheDirectory=true`

`hard-source-webpack-plugin`用于开启插件的缓存。

```

```

### 手写 bundle 原型

### 手写 webpack

### 打包流程

- 1. 读取 webpack.config.js 配置文件
- 2. 初始化 compiler 对象，注册插件
- 3. 加载 enty 入口文件，生成抽象语法树，提取依赖，递归这个操作
- 4. 加载各种 loader，对各种文件做转换处理，同样的递归这个操作
- 5. 根据前两个的结果，构造依赖树，根据依赖树合并模块生成一个或多个打包文件

### Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

loader：转换非 js 类型的文件,让 webpack 可以打包进来，因为 webpack 默认只能处理 js 文件。
plugin：作用范围更广，打包优化，代码压缩等

### 常用的 loader：

- 处理 css 文件相关的：
  - postcss-loader： css 代码添加浏览器前缀+css 代码压缩
  - less-loader, 使用 less 文件转换成 css 文件，css-loader 再把 css 文件转换成 js 文件, style-loader 再把 js 代码插入到 head 里 style 标签里
  - mini-css-extact-plugin: 拆分 css 代码，以外部引入 link 的方式添加到 head 里，css 代码很多的情况下用于替换 style-loader

### 使用注意事项：

### webpack 打包的 js 文件不能这样混用

```js
// import "./css/editor.css'"
// 只能module.exports+require 或者 import+ export
```

### tree-shaking 优化打包体积

production 模式会自动开启 tree-shaking

非 production 模式如何开启呢？

配置项 opimization 添加打包优化配置：

```js
  optimization: {
    usedExports: true, //标记使用和未使用代码
    minimize: true, // 开启代码压缩,移除未使用代码
    // concatenateModules: true, //进一步优化打包体积，打包时，将所有模块放到一个函数里
  },
```

另外，还可以配合 sideEffects 来进一步优化打包体积

1. 开启 webpack sideEffects 功能

```js
  optimization: {
    usedExports: true, //标记使用和未使用代码
    minimize: true, // 开启代码压缩,移除未使用代码
    // concatenateModules: true, //进一步优化打包体积，打包时，将所有模块放到一个函数里
    sideEffects:ture, //开启webpack sideEffects功能
  },
```

2. 在你的 node 包的 package.json 文件里，加入：

   ```js
   //sideEffects:false , // 即申明所有文件都是没有副作用的，webpack会自动将import {a} from xx 转换为 import {a} from 'xx/a'，从而自动修剪掉不必要的 import
   //这样申明所有文件都是没有副作用会存在问题：如果你的模块文件有些代码是有副作用，副作用包括你修改了原生对象的原型，import进了css文件，这些有副作用的模块因为你申明了所有文件是没有副作用的而不会被打包进来
   // 优化: 申明具体哪些文件有副作用的
   sideEffects:[
     "./src/index.css",
     "./src/home.js"
   ] 
   ```

### webpack code splitting 优化打包体积

webpack打包问题：

- 所有模块都打包到了一起。如果应用很大，打包文件就会很大
- 并不是每个模块在启动时都是必须的。

优化：

分包，按需加载

问题：如果划分模块分包？物级会必反，浪费流量

webpack支持的分包功能实现的主要方式：

#### 多入口打包

	- 适用于多页应用程序有多个html页
	- 一个页面对应一个打包入口
	- 不同页面之间有公共模块就提取公共模块单独打包

具体实现：

enty: 配置成数组，意思是多个文件打包到一起，还是一个入口

enty：配置成对象，意思是多入口

```js
{
  entry:{
    //入口名称：对应的入口文件
    index:"./src/index.js" , //入口文件1
    ablumn:"./src/albumn.js". //入口文件2
  }，
  output:{
    filename:'[name].bundle.js', // name会动态替换成入口名称
  },
    plugins:[
      //HtmlWebpackPlugin插件默认会在生成的html文件注入所有的打包文件
      // 但是多入口打包时，我们只想要各自的html只注入各自的打包文件，怎么办？
      // 通过chunks指定html自动注入的bundle
      // 根据模版文件在打包目录自动生成html页
      new HtmlWebpackPlugin({
        title:"muti entry",
        template:"./src/index.html",
        filename:"index.html"，
        chunks:"index"// 指定html自动注入的打包文件，跟入口名称要一致
      }),
       new HtmlWebpackPlugin({
        title:"muti entry",
        template:"./src/albumn.html",
        filename:"albumn.html",
         chunks:"ablumn"
      }),
    ]
}

// 运行； yarn webpack

```

多入口打包存在的问题：

多个打包文件肯定会存在公共模块，打包的时候不是会重复打包？

优化：提供公共模块单独打包

```js
optimization:{
  splitChunks:{
    chunks:"all",// 将所有的公共模块提取出来单独打包
  }
}
```



#### esmodules的动态导入成员的方式

在应用运行中，需要哪个模块才加载哪个模块。=》省流

你只要使用esmodules的动态导入成员的方式来导入模块，webpack会自动实现模块的按需加载和分包

向单页应用vue,react 等，可以使用动态导入路由的形式达到同样的效果。

使用动态导入，生成的打包文件名称是一个序列号，如果我想给打包文件命名怎么办？用魔法注释:/* webpackChunkName:'posts'*/ ，打包文件名会变成posts， 如果你多个动态导入的模块webpackChunkName一样，那相同webpackChunkName的动态导入模块会被打包到同一个文件里。

```js
if(hash="#post"){
  import(/* webpackChunkName:'posts'*/"./posts/posts").then(({deault:post})=>{
    xxx
    
  })
  
}else if(hash="#post"){
  
}
```



### miniCssExtactPlugin   将css代码从打包结果中提取出来单独打包成一个文件

使用了miniCssExtactPlugin就不再需要style-loader了。

style-loader是以style标签的形式将css代码插入到head中，

miniCssExtactPlugin将所有css代码提取出来成一个文件以后，要link的形式，注入到html页面里。

注意：css文件超过了150kb才考虑单独提取出来

```js
module:{
 rules:[
   {
     test:/\.css*/,
     use:[
       MiniCssExtactPlugin.loader, //使用MiniCssExtactPlugin中的loader替换style-loader
      // "style-loader",
       "css-loader"
     ]
   },
 ]
},
plugins:[
  new miniCssExtactPlugin({
    filename:[name].
  })
]
```

### optimize-css-assets-webpack-plugin 官方推荐压缩css代码

Webpack production模式会自动启动压缩功能，但是只针对js代码。

注意这个插件不要放到plugins里，而是建议放到optimization：{minimizer：[]}, 数组中.

为什么？放到plugins时，不管什么mode都会启用。

放到optimizaiton里，只有你开启压缩时候，比如production模式，会自动开启minimizer，使用这个插件，启动压缩。

注意：如果你配置了minimizer这个选项，webpack会视为你要自定义压缩器插件，webpack内部使用的js压缩器TeserWebpackPlugin会被覆盖掉，因此你也需要手动添加一个这个js压缩器

```js
optimizaiton:{
  minimizer:[
    new TeserWebpackPlugin(), // 压缩js代码
    new OptimizeCssAssetsWebpackPlugin(), // 压缩css代码

  ]
},
module:{
 rules:[
   {
     test:/\.css*/,
     use:[
       MiniCssExtactPlugin.loader, //使用MiniCssExtactPlugin中的loader替换style-loader
      // "style-loader",
       "css-loader"
     ]
   },
 ]
},
plugins:[
  new miniCssExtactPlugin()
]

```



### webpack输出文件名hash



一般部署前端的资源文件时，都会启用服务器的静态资源缓存，如果你的缓存失效时候设置得过短，达不到效果，设置得过长，如果你的前端应用更新了，重新部署后，就没办法及时更新到客户端。

如果解决？

在生产模式下，文件名添加hash值，全新的文件名就是全新的请求，就不会有缓存问题

#### hash

#### chunkhash：最适合解决缓存问题

#### contenthash: 

```js
plugins:[
  new miniCssExtactPlugin({
    filename:"[name]-[hash].bundle.css"
  })
]
```

