
#### 项目使用的第三方插件
+ electron-is-dev
#### 项目启动
1.启动 `react` 项目
```shell
npm start
```
2.启动 `electron`
```shell
npm run electron-start
```
#### 工具包推荐
```shell
electron-is-dev:用于判断 electron 是否处于开发环境
concurrently:用于将多命令连接在一起使用
wait-on:等待某个结果执行之后执行后续的某些命令
cross-env:用于设置关闭某项依赖服务的同时又不影响所需要的启动的主要服务
```


```shell
//    "dev": "concurrently \"cross-env BROWSER=none npm start\" \"wait-on http://localhost:3000 && npm run electron-start\" "
    "dev": "concurrently \"npm start\" \"wait-on http://localhost:3000 && npm run electron-start\" ",
```