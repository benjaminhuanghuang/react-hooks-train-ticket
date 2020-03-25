## Progressive Web App

## PWS 技术组成
- Service worker

常驻内存运行，代理网络请求， 依赖HTTPS

- Promise

- fetch
  - 比XMLHttpRequest 更简洁
  - Proimse 风格

- cache API
  - 支持离线运行
  - 拦截请求，使用cache中的资源
  - 依赖Service worker代理网络请求

- Notification API


## workbox 
Using libaray workbox 
```
workbox-webpack-plugin
```
Activete it in index.js
```
  if ("production" === process.env.NODE_ENV) {
    serviceWorker.register();
  } else {
    serviceWorker.unregister();
  }
```

manifest.json: define the icon, name of the web application

