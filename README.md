剃投管理系统

项目采用vue，iView组件库，用vue-cli搭建。

生产地址 http://mng.tvote.red/

开发地址 http://mng.dev.tvote.red/

测试地址 http://mng.dev.tvote.red/

项目成员
 前端开发 袁亮 范雅飞

目錄结构
APP
    |__ build/   (编译相关配置，本地服务配置)

    |__ config/  (开发环境配置，开发代理配置)

    |__ dist/    (打包生成文件，用於線上环境)

    |__ static/  (打包生成文件，用於線上环境)
        |__ login-authorize.html (登录成功重定向页面)

    |__ src/     (项目开发文件)
        |__ api/
            |__ index.js (系统后台接口文件)

        |__ assets/
            |__ images
              |__ ***.png
            |__ common.scss (通用样式)

        |__ components/
            |__ ***       (菜單功能分组)
              |__ ***.vue (菜單功能模塊)

        |__ mixins/
            |__ globalSpin.js (处理全局Spin)

        |__ utils/
            |__ fetch.js (axios拦截器)

        |__ views/ (菜單页面)
            |__ ***       (菜單功能分组)
              |__ ***.vue (菜單功能页面)

        |__ app.vue

        |__ main          (项目入口文件)

        |__ router        (路由註冊管理)

Build Setup
# install dependencies
npm install

- 安装依赖
- npm install時可能node-sass安装不成功。切到node_modules/node-sass/目錄下再npm install一下
- 如果某些依赖安装困难，可采用淘宝镜像進行安装。

# serve with hot reload at localhost:8888
npm run dev

- 本地开发命令
- 开始开发
- 热加載默認在 localhost: 8088，可以在config/index/dev.port处修改
- 开发時联调需要數據代理，可以在config/index/dev.proxyTable修改


# build for production with minification
npm run build

编译发布编译后在dist生产最新文件

# build for production and view the bundle analyzer report
npm run build --report
