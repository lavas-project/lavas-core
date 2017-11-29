# 1. 概述

Lavas 是一套基于 Vue 的 PWA 解决方案，可以帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题。如果您对 PWA 和 Lavas 还有任何疑问，可以在[我们的官方站点](https://lavas.baidu.com/)上找到二者的教程和文档。

在前一版 Lavas 的基础上，我们倾听了来自开发者的反馈，并跟随业界最新的技术和规范，升级完成了 Lavas 2.0 版本。您可以安装或升级 Lavas 命令行工具，并跟随本教程完成一个简单却完整的示例站点，享受 PWA 带来的全新浏览体验。让我们快速开始吧！

## Lavas 2.0 的改进点

* 不再需要事先选择模板，降低上手难度
* 支持多个入口 (entry)，允许站点的多个模块互相独立
* 服务端渲染 (SSR) 和客户端渲染 (MPA/SPA) 可以快速切换
* 自动生成路由规则，避免重复代码
* 针对 SSR 提供了更加合理的 AppShell 支持，享受更加顺滑和健壮的浏览体验

## 通过本教程您可以学到

* 如何使用更新后的 Lavas 命令行工具创建 Lavas 2.0 项目
* 如何开发 Lavas 2.0 项目
* 如何更好的支持 SSR 下的 AppShell 模型 （__和 Lavas 无关的通用技术解决方案__）

## 学习本教程前您应该掌握

* HTML, CSS(less或stylus), JavaScript 等前端编程基础
* ES6/7 部分常用语法，如 Promise, import/export 等
* Vue, Vuex, Vue-router 等基本的开发知识
* PWA 和 Service Worker 的基本知识，如生命周期，缓存能力等 （__推荐__）
* Webpack, Node.js, Koa 等基本知识 （__推荐__）

## 在开发前您需要准备

* 一台可以正常联网的计算机并已安装较新版本的 Node.js (≥ 5.0) 和 npm (≥ 3.0)
* 一个支持 Service Worker 的浏览器，推荐使用 Google Chrome
* 一个自己习惯的文本编辑器，如 Sublime Text, Web Storm 等等

# 2. 准备环境

1. 安装/升级 Lavas 命令行工具

    ```bash
    npm install lavas@lavas2 -g
    ```

2. 在合适的目录新建项目并命名，例如本教程中的 "lavas-2-sample"

    ```bash
    lavas init
    ```

    ![lava init](http://boscdn.bpc.baidu.com/assets/lavas/codelab/lavas-init-2.png)

3. 进入目录并安装依赖

    ```bash
    npm install
    ```

4. 启动开发服务器，访问 localhost:3000 将看到初始页面。
    ```bash
    lavas dev
    ```

默认启动 express 作为开发服务器，Koa 的使用例子请参考“使用 Koa 作为服务器”(施工中)教程。

接下来我们会通过一些代码的修改来进一步加深印象，了解 Lavas 的主要功能。

# 3. 查看主页

`pages` 文件夹用于存放路由组件，Lavas 会自动根据文件结构创建路由规则，如果需要修改自动生成的路由对象，请参考“修改路由配置”一节。

在初始模板中，`pages` 中如下的文件结构将生成三条路由规则：`/appshell/main`, `/` 和 `/error`。之前我们访问的主页对应着 `Index.vue`。另外，可以发现单页面组件的名称遵循了 Pascal 命名规范，这是 Vue 的编码规范推荐的[形式之一](https://vuejs.org/v2/style-guide/#Single-file-component-filename-casing-strongly-recommended)。
```
pages
├── Error.vue
├── Index.vue
└── appshell
    └── Main.vue
```

让我们查看一下 `Index.vue`，这是一个标准的 Vue 页面组件，熟悉 Vue 开发的同学一定对它的结构相当了解：
```html
<template>
// 省略模板代码
</template>
<script>
export default {
    name: 'index',
    head: {
        title: 'Home',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    }
};
</script>
<style lang="stylus" scoped>
// 省略样式规则
</style>
```

其中 Lavas 使用了 vue-meta 对 html 的信息进行定义。其中的 `head` 是一个可配置的 key，通过修改 `entries/main/app.js` 中的相关配置进行修改。而具体包含的配置项以及涵义也可以参见 [vue-meta github](https://github.com/declandewet/vue-meta) 。

了解了 Lavas 对于路由组件的处理规则，下面我们将创建一个新的页面。

# 4. 创建新页面和链接

一个站点只有一个首页显然是不行的，让我们再创建一个页面。这是一个附带了__动态参数__的页面。

## 创建页面

之前提过，Lavas 2.0 的一大改进点是根据 `pages` 文件目录结构自动生成路由规则。这里让我们创建一个文章详情页面，它的访问路由路径为 `/detail/[id]`  ([id] 表示动态参数，一般来说是数字，如 `/detail/1` 即访问 id=1 的文章)。

Notes: Lavas 对 `pages` 文件夹进行了监听，发生变动会重新生成路由规则，所以在以下操作过程中请保持开发服务器处于运行状态，如果已经关闭，请重新开启。

首先我们需要在 `pages` 下创建一个子目录 `detail`，并在其中创建一个 Vue 页面组件 `_id.vue`， 文件结构如下：
```
├── Error.vue
├── Index.vue
├── appshell
│   └── Main.vue
└── detail
    └── _id.vue
```

`_id.vue` 的内容如下：
```html
<template>
    <div class="detail-wrapper">
        <article class="detail-content">
            <header class="detail-title">
                Detail {{$route.params.id}}
            </header>
            <!-- link to another detail -->
            <p>
            Progressive Web Apps are user experiences that have the reach of the web, and are:
Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.
Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
            </p>
            <!-- link to index -->
        </article>
    </div>
</template>

<script>
export default {
    name: 'detail-_id',
    head() {
        return {
            title: `Detail ${this.$route.params.id}`,
            titleTemplate: '%s - Lavas',
            meta: [
                {name: 'keywords', content: `detail ${this.$route.params.id}`},
                {name: 'description', content: `detail ${this.$route.params.id}`}
            ]
        };
    }
};
</script>

<style lang="stylus" scoped>
.detail-content
    font-size 16px
    line-height 30px
    margin-top 30px

    .detail-title
        margin-bottom 20px
        padding 10px 0
        font-size 36px
        font-weight bold

</style>
```

从文件名称来看，Lavas 2.0 约定 以下划线开头的 vue 文件是包含动态参数的页面，除了首字母不用大写之外 (因为第一个也不是字母)，下划线后面的内容 (如例子中的 `id`) 即为动态参数的名称。

从文件内容来看，让我们先忽略其中的两条 link 相关的注释。除了普通的页面内容之外，我们注意到在 `<template>` 和 `<script>` 中分别出现了 `{{$route.params.id}}` 和 `this.route.params.id`，这便是 Lavas 2.0 解析了 URL 之后产出动态参数的获取方式。举例来说，当用户访问 `/detail/1`，则这两个变量的值都是 `1`。

## 创建链接

这里我们来尝试在两个页面之间添加一些链接。开发者应当已经很熟悉 html 的 `<a>` 标签或者 vue 的 `<router-link>`标签。 虽然 Lavas 也支持这两种标签，但我们__强烈建议__用户使用我们的自定义标签 `<lavas-link>`，它的用法和 `<router-link>` 基本相同。

让我们在刚刚创建的 `detail/_id.vue` 的两处注释部分分别添加两个链接，代码如下：

```html
<!-- link to another detail -->
<lavas-link :to="{
    name: 'detailId',
    params: {
        id: Number($route.params.id) + 1
    }
}">Detail {{Number($route.params.id) + 1}}</lavas-link>

<!-- link to index -->
<lavas-link to="/">Back to home</lavas-link>
```

这里展示了两种 `<lavas-link>` 的使用方法，差别只在 `to` 属性。

1. `to` 属性是一个对象，由 `name` (必填) 和 `params` (选填) 组成。例子中的 `detailId` 是 Lavas 自动生成的路由名称，由文件路径和驼峰规则拼装而成 (`detail` + `_id => Id`)。因为 `detailId` 页面包含动态参数，所以允许我们再传入一个 `params.id`。 这样如果当前 URL 为 `/detail/1`， 那么点击之后就跳往了 `/detail/2`，以此类推。

2. `to` 属性是一个字符串，这种情况更加简单，直接填入目标页面的地址，也适用于外部链接。

经过两个简单的步骤，我们的第二个页面也完成了！保存文件，使用 `npm run dev` 启动项目之后，通过浏览器访问 http://localhost:3000/detail/1 即可看到这个新增的详情页面。

![step 4](http://boscdn.bpc.baidu.com/assets/lavas/codelab/lavas-2.0-sample-step4.png)

在进入下一个步骤之前，想一想你可以在首页添加一个链接跳往详情页吗？自己动手试试吧！

# 5. 发送请求

在同构应用中，服务端需要发送 HTTP 请求，而客户端需要发送 XHR 异步请求，很多库帮助开发者抹平了这种差异，[axios](https://github.com/axios/axios) 就是其中之一。在本节中，我们将使用 axios 请求雅虎天气数据并展示在页面上。

首先安装 axios:
```bash
npm install axios --save
```

接着在 `pages/detail/_id.vue` 中，引入 axios：
```javascript
import axios from 'axios';
```

请求数据可以发生在路由导航完成之前或者之后，两种方式的特点可以参考 vue-router [数据获取](https://router.vuejs.org/zh-cn/advanced/data-fetching.html)一节。Lavas 默认采用了在路由导航完成之前请求数据，在顶部使用进度条给予用户视觉反馈。

为了支持服务端渲染 (SSR) ，每个页面组件都应当支持同时在服务端和浏览器端正常渲染。 Lavas 给开发者暴露了 `async asyncData() ` 方法，开发者一般通过实现这个方法来完成一些渲染前的操作，例如发送请求、获取数据和简单计算等，并且这些操作是同时支持服务端和浏览器端的。在本节中，我们就在 `asyncData` 方法内实现发送请求获取数据。

修改后的 `detail/_id.vue` 内容大致如下(仅 script 部分)

```javascript
import axios from 'axios';

export default {
    name: 'detail-_id',
    head() {
        // 内容省略，和第四节相同
    },
    async asyncData() {
        let result = await axios(`https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.text%20from%20weather.forecast%20where%20woeid%20%3D%202151330&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`);

        console.log('Weather of Beijing: ', result.data.query.results.channel.item.condition.text);
    }
};
```

当浏览器首次访问页面(或者在当前页面刷新)时，Lavas 进入服务端渲染流程，因此北京的天气会打印在后端的命令行中

![server](http://boscdn.bpc.baidu.com/assets/lavas/codelab/lavas-axios-server-2.png)

而当后续访问时(例如点击页面上的链接跳转到其他详情页)，由浏览器端的 js 负责页面的跳转和渲染等，因此北京的天气会打印在浏览器的 console 中

![client](http://boscdn.bpc.baidu.com/assets/lavas/codelab/lavas-axios-client-2.png)

# 6. 使用 Vuex 管理数据

[Vuex](https://vuex.vuejs.org/zh-cn/) 是一个专为 Vue.js 应用程序开发的状态管理模式，一般用来管理页面的数据获取和访问。

接着上一节的话题，如果我们需要发送请求获取数据并且在页面中使用，一个更加常见且合理的方式是使用 Vuex 来管理，因此这一节我们会改造上一节那种“原始”的方式，让代码变的更具结构性和扩展性，也更符合常规线上应用的要求。

## 创建 store

首先我们在根目录下的 `store` 目录内创建一个 `detail.js`，内容如下：

```javascript
import axios from 'axios';

const SET_WEATHER = 'setWeather';

export const state = () => ({
    weather: {
        text: '',
        temp: 0
    }
});

export const mutations = {
    [SET_WEATHER](state, {weatherText, weatherTemp}) {
        state.weather = {
            text: weatherText,
            temp: weatherTemp
        };
    }
};

export const actions = {
    async setWeather({commit}, params) {
        try {
            let url = `https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20${params.woeid}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
            let result = await axios(url);

            let condition = result.data.query.results.channel.item.condition;

            commit(SET_WEATHER, {
                weatherText: condition.text,
                weatherTemp: condition.temp
            })
        }
        catch (e) {
            // TODO with error
            console.log('error in setWeather');
            console.log(e);
        }
    }
};
```

关于 Vuex 的组成 (state, mutations, actions) 以及写法等在这里不做介绍，在他们的[教程](https://vuex.vuejs.org/zh-cn/)上有详尽的介绍。

这里我们可以看到，原先在上一节中发送请求的部分移动到了 Vuex 的 action `setWeather` 中，因此对 `axios` 的引入也改到了这里。此外为了模拟现实情况，我们把城市ID (woeid) 当做参数由外部传入，而不是像上一节那样写死在代码中。

Lavas 会自动扫描 `store` 目录中的文件，逐个以 Vuex 的模块 (module) 进行加载。因此不必再在别处进行配置即可直接使用了。

## 使用 store

我们需要修改 `pages/detail/_id.vue`，让他可以使用我们刚才建立的 Vuex 模块来获取天气数据，代码如下：(还是只列出 script 部分)

```javascript
import {mapState} from 'vuex'

export default {
    name: 'detail-_id',
    head() {
        // 内容省略，和第四节相同
    },
    async asyncData({store, route}) {
        await store.dispatch('detail/setWeather', {woeid: 2151849});
    },
    computed: {
        ...mapState('detail', [
            'weather'
        ])
    },
    created() {
        console.log(`Weather of Shanghai: ${this.weather.text}, ${this.weather.temp}°F`);
    }
};
```

首先关注 `asyncData` 方法，这里不再直接发送请求，而是调用我们刚刚创建的 Vuex 模块的 `dispatch` 方法来告知 store 发送请求获取数据。

接着我们在这里使用 Vuex 的快捷函数 `mapState`，将状态 `weather` 挂载到 `this` 中。

最后我们采用了 Vue 的生命周期钩子 `created()` 打印获取到的天气信息，这也是为了和上一节的例子保持一致。真实的应用中，我们更可能将天气信息显示到页面上而非打印在 console 里。

至此我们已经完成了示例应用的基本搭建，并且虽然简单却包含了很多功能，包括多个页面，跳转链接，发送异步请求和使用 Vuex 管理数据。接下来我们要学习如何使用 Lavas 的核心功能，让站点拥有 PWA 特性。

# 7. 配置 Manifest

本节我们将“添加到桌面”， PWA 的重要特性之一就是

# 8. 编写 Service Worker

# 9. 发布代码和上线方式

lavas build
lavas start

# 11. 修改渲染方式 (扩展)

# 12. 使用 Koa (扩展)

由于 Koa 使用了 ES7 async/await 语法，很多基于 Koa 的中间件都是直接使用，并没有使用类似 Babel 进行转译。所以 Koa 对 Node.js 的版本是有要求的，必须高于 7.6.0。

我们以开发服务脚本为例，打开 `server.dev.js`，首先引入 Koa：
```
- const express = require('express');
+ const Koa = require('koa');
```

然后使用 Koa 创建 `app`，并使用 `koaMiddleware` 代替 `expressMiddleware`：
```
function startDevServer() {
    - app = express();
    + app = new Koa();
    core.build()
        .then(() => {
            - app.use(core.expressMiddleware());
         + app.use(core.koaMiddleware());
```

通过 `lavas dev` 启动开发服务器，将看到 express 已经切换成了 Koa，一切就是这么简单！

# 5. 创建第二个入口 (扩展)

入口 (entry) 可以理解为多个页面 (page) 的集合，一个入口内部可以共享一些配置，包括路由方面的 `baseUrl`, `mode`，以及整个页面的外部框架等等。

让我们列举几个比较常见的入口使用场景来深入了解：

* 一个站点既提供 PC 服务又提供移动服务且两者页面并不共享，那么就可以创建两个入口来分别管理。

* 一个站点的两个模块在渲染模式 (是否服务端渲染)， 路由规则 (hash 或者 history) 或者外观样式，配色等不尽相同，则可以将这两个模块处理为两个入口。例如电商网站的母婴品类和数码3C品类。

通过 `lavas init` 的项目初始状态只包含一个入口，因此这里我们将创建第二个入口。如果您的最终开发计划中并不包括多入口，那您也可以跳过这里直接进入下一个步骤。

刚才我们已经创建了一个详情页面。一般来说详情页面和首页的外观布局就不太一样，例如详情页会多一个头部，会有一个按钮快速回到首页。既然已经 <s>强行</s> 有了需求，那让我们尝试创建一个入口吧。

## 修改入口配置

修改入口并不需要更改页面，因此 `pages` 目录不需要改动。我们打开根目录下的 `lavas.config.js` 文件 (包含几乎所有的配置项), 找到 `entry` 这一项 (初始状态应该包含一个名称为 `main` 的入口)，增加一个名称为 `detail` 的配置量，如下：

```
entry: [
    {
        name: 'detail',
        ssr: true,
        mode: 'history',
        base: '/',
        routes: /^\/detail/,
        pageTransition: {
            type: 'fade',
            transitionClass: 'fade'
        }
    },
    {
        name: 'main',
        ssr: true,
        mode: 'history',
        base: '/',
        routes: /^.*$/,
        pageTransition: {
            type: 'fade',
            transitionClass: 'fade'
        }
    }
]
```

通过路由匹配规则 `/^\/detail/`，我们成功地将刚才新建的详情页划归到新的入口 `detail` 中。但是新的入口只有配置，还没有实际的内容。

## 新增入口内容

让我们把注意点移动到 entries 目录中。为了简单起见，我们将已有的 main 目录内的所有内容复制一份，并命名为 detail。接着我们修改 detail/app.js ，使其引用自己的路由：

```
// import {createRouter} from '@/.lavas/main/router';
import {createRouter} from '@/.lavas/detail/router';
```

最后我们修改 detail/App.vue，实现先前提到的头部。为了简单我们只实现一个带颜色的头部作为示意。

```
<template>
    <div id="app">
        <!-- 添加header -->
        <header class="detail-header">Detail Header</header>
        <!-- 添加结束 -->

    <!-- 具体内容省略 -->

    </div>
</template>
```

并在 `<style>` 的最后增加样式

```
.detail-header
    background #ccc
    height 16px
```

保存文件后用浏览器查看 `http://localhost:3000/detail/1`，可以看到一个灰色的头部出现。

![step 5](http://boscdn.bpc.baidu.com/assets/lavas/codelab/step5.png)

有两点需要补充说明一下：

1. 为详情页添加头部的方法还有很多，可以直接在 \_id.vue 上方编写 (无法复用)，也可以通过父路由实现 (受限于路由规则)。这里只是为了演示创建入口而举的例子，并非舍近求远。

2. 因为目前只有两个页面 (首页和详情页)，所以添加了入口之后也仅仅影响到一个详情页而已。但当实际项目中页面数量增多之后，就能逐渐体现入口方案的优越性。
