# immortal-admin-template

## 一、简介

> 【注】：笔者定制模板的主要目的是便于以后的开发

基于[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)定制的基础后台模板，绝大部分功能保持一样，只做了以下改变：

- 新增标签式页面管理
- 汉化重要文件注释
- 更新组件版本到最新的兼容版本
- 移除表格、表单等页面
- 新增用户管理页面及其子功能（CRUD）
- 新增用户管理Mock服务
- 新增集中式侧边栏logo区标题和图片配置

## 二、版本变迁

> 【注】：在`version-history.txt`文件中有记录了版本变迁历史

- 项目依赖

  |    依赖名称    | 旧版本 | 新版本 |
  | :------------: | :----: | :----: |
  |     axios      | 0.18.0 | 0.21.0 |
  |    core-js     | 3.6.5  | 3.20.0 |
  |   element-ui   | 2.13.2 | 2.15.7 |
  |   js-cookie    | 2.2.0  | 2.2.1  |
  | normalize.css  | 7.0.0  | 8.0.1  |
  | path-to-regexp | 2.4.0  | 6.1.0  |
  |      vue       | 2.6.10 | 2.6.14 |
  |   vue-router   | 3.0.6  | 3.5.3  |
  |      vuex      | 3.1.0  | 3.6.2  |

- 开发依赖

  |            依赖名称            |    旧版本     | 新版本 |
  | :----------------------------: | :-----------: | :----: |
  |     @vue/cli-plugin-babel      |     4.4.0     | 4.5.15 |
  |     @vue/cli-plugin-eslint     |     4.4.0     | 4.5.15 |
  |   @vue/cli-plugin-unit-jest    |     4.4.0     | 4.5.15 |
  |        @vue/cli-service        |     4.4.0     | 4.5.15 |
  |        @vue/test-utils         | 1.0.0-beta.29 | 1.3.0  |
  |          autoprefixer          |     9.5.1     | 9.8.8  |
  |            connect             |     3.6.6     | 3.7.0  |
  |             eslint             |     6.7.2     | 6.8.0  |
  |       eslint-plugin-vue        |     6.2.2     | 7.20.0 |
  |             mockjs             |  1.0.0-beta3  | 1.1.0  |
  |            postcss             |               | 8.4.5  |
  |             runjs              |     4.3.2     | 4.3.3  |
  |              sass              |    1.26.8     | 1.39.2 |
  |          sass-loader           |     8.0.2     | 9.0.3  |
  | script-ext-html-webpack-plugin |     2.1.3     | 2.1.5  |
  |         service-static         |    1.13.2     | 1.14.2 |
  |       svg-sprite-loader        |     4.1.3     | 4.3.0  |
  |              svgo              |     1.2.2     | 1.3.2  |
  |     vue-template-compiler      |    2.6.10     | 2.6.14 |
  |            webpack             |               | 4.46.0 |

## 三、相关项目

- [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## 四、使用

- 启动

```bash
# 克隆项目到本地
git clone https://gitee.com/immortal-wang/immortal-admin-template.git
# 进入项目目录
cd immortal-admin-template
# 使用yarn安装依赖
yarn install
# 开发环境启动项目
yarn dev
```

- 打包

```bash
# 构建测试环境
npm run build:stage
# 构建生产环境
npm run build:prod
```

- 其它

```bash
# 预览发布环境效果
npm run preview
# 预览发布环境效果 + 静态资源分析
npm run preview -- --report
# 代码格式检查
npm run lint
# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## 五、演示

![](https://gitee.com/immortal-wang/public-images/raw/master/blog/Login.png)

![](https://gitee.com/immortal-wang/public-images/raw/master/blog/Home.png)

![](https://gitee.com/immortal-wang/public-images/raw/master/blog/UserList.png)

![](https://gitee.com/immortal-wang/public-images/raw/master/blog/AddUser.png)

![](https://gitee.com/immortal-wang/public-images/raw/master/blog/DisplayUser.png)

![](https://gitee.com/immortal-wang/public-images/raw/master/blog/UpdateUser.png)

![](https://gitee.com/immortal-wang/public-images/raw/master/blog/DeleteUser.png)

![](https://gitee.com/immortal-wang/public-images/raw/master/blog/UpdateUserStatus.png)

## 六、其他

### 6.1、致谢

- 感谢`vue-admin-template`后台模板作者

- 感谢此项目使用的开源库的所有作者

### 6.2、浏览器支持信息

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE10, IE11, Edge                                             | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

### 6.2、许可信息

- [麻省理工许可证](https://gitee.com/immortal-wang/immortal-admin-template/blob/master/LICENSE)
- Copyright (c) 2021 Edison-Wang

### 6.3、免责声明

- 此项目只是对vue-admin-template项目做了定制，使其变得更容易上手，可能会出现一些未测到的意外情况，请知悉后使用

- 使用此项目所带来的一切未知后果，笔者不承担责任
- 不喜勿喷



如果对您有帮助，您可以点右上角 ★Star★支持

