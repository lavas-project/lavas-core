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
* WebPack, Node.js, Koa 等基本知识 （__推荐__）

## 在开发前您需要准备

* 一台可以正常联网的计算机并已安装较新版本的 Node.js (≥ 5.0) 和 npm (≥ 3.0)
* 一个支持 Service Worker 的浏览器，推荐使用 Google Chrome
* 一个自己习惯的文本编辑器，如 Sublime Text, Web Storm 等等

# 2. 准备环境

1. 安装/升级 Lavas 命令行工具，最新版本应当 ≥ 2.0

    ```
    npm install lavas -g
    ```

2. 在合适的目录新建项目并命名，例如本教程中的 "lavas-2-sample"

    ```
    lavas init
    ```

    ![lava init](http://boscdn.bpc.baidu.com/assets/lavas/codelab/lavas-init.png)

3. 进入目录并安装依赖

    ```
    npm install
    ```

至此我们已经完成了 Lavas 项目的初始化工作并安装了依赖。Lavas 命令行工具提供的默认项目也是可以运行的，但接下来我们会通过一些代码的修改来进一步加深印象，了解 Lavas 的主要功能。

# 3. 创建并查看首页

Lavas 2.0 会自动根据页面组件创建路由规则，因此对于页面组件的名称也有命名要求。首页必须位于 `pages` 目录的根部并命名为 `Index.vue` 。事实上小写开头的 `index.vue` 也被认可，但根据 Vue 的最新编码规范，组件名称还是推荐大写开头的 Pascal 命名规范。

`Index.vue` 是一个标准的 Vue 页面组件，熟悉 Vue 开发的同学一定对它的结构相当了解。我们为页面添加一些内容和样式，如下：

```
<template>
    <div>
        <h2 class="gray--text">LAVAS</h2>
        <h4 class="gray--text">[ˈlɑ:vəz]</h4>
    </div>
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
h2
    margin-top 50%
    font-size 46px
    font-weight 500
</style>
```

对于其中的 script 部分可以多说一句，Lavas 内部使用 vue-meta 对 html 的信息进行定义。其中的 `head` 是一个可配置的 key，通过修改 `core/meta.js` 中的相关配置进行修改。而具体包含的配置项以及涵义也可以参见 [vue-meta github](https://github.com/declandewet/vue-meta) 。

之后通过运行命令启动开发模式

```
npm run dev
```

打开浏览器，访问 `http://localhost:3000/` 可以看到页面效果。

# 4. 创建第二个页面和链接

一个站点只有一个首页显然是不行的，让我们再创建一个页面。这次我们试图创建一个附带__动态参数__的页面。

## 创建页面

之前提过，Lavas 2.0 的一大改进点是根据页面所处文件位置自动生成路由规则。这里让我们创建一个文章详情页面，它的访问路由为 `/detail/[id]`  ([id] 表示动态参数，一般来说是数字，如 `/detail/1` 即访问 id=1 的文章)。那么我们需要在 `pages` 目录中创建一个子目录 `detail`， 并在其中创建一个 vue 源文件 `_id.vue`， 内容如下：

```
<template>
    <div class="detail-wrapper">
        <article class="detail-content text-xs-center">
            <header class="detail-title text-xs-center">
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

保存文件，使用 `npm run dev` 启动项目之后，通过浏览器访问 `http://localhost:3000/detail/1` 即可访问到这个新增的第二个页面。当然你还可以尝试输入其他 id 来观察两处动态参数 (页面头部和 meta 信息) 的变化。

## 创建链接

这里我们来尝试在两个页面之间添加一些链接。开发者当然可以使用 `<a>` 标签或者 vue 提供的 `<router-link>`

# 5. 创建第二个入口

# 6. 发送异步请求

# 7. 使用 vuex 管理数据

# 8. 配置 Manifest

# 9. 编写 Service Worker

# 10. 发布代码和上线方式

# 11. 修改渲染方式 (扩展)
