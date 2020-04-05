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
Using libaray workbox with webpack
```
workbox-webpack-plugin
```

## Using pwa in project
0. Active pwa in index.js
```
  if ("production" === process.env.NODE_ENV) {
    serviceWorker.register();
  } else {
    serviceWorker.unregister();
  }
```

1. Create html file for each react app/page


2. Setup path for each of module
Modify webpack config in paths.js
```
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),

  appQueryHtml: resolveApp('public/query.html'),
  appQueryJs: resolveModule(resolveApp, 'src/query/index'),

  appTicketHtml: resolveApp('public/ticket.html'),
  appTicketJs: resolveModule(resolveApp, 'src/ticket/index'),

  appOrderHtml: resolveApp('public/order.html'),
  appOrderJs: resolveModule(resolveApp, 'src/order/index'),
```
3. Add entry for each of module in webpack.config.js
```
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),

  appQueryHtml: resolveApp('public/query.html'),
  appQueryJs: resolveModule(resolveApp, 'src/query/index'),

  appTicketHtml: resolveApp('public/ticket.html'),
  appTicketJs: resolveModule(resolveApp, 'src/ticket/index'),

  appOrderHtml: resolveApp('public/order.html'),
  appOrderJs: resolveModule(resolveApp, 'src/order/index'),
```
4. Create HtmlWebpackPlugin  for each page in webpack.config.js
```
  new HtmlWebpackPlugin()
```

5. output
```
  filename: isEnvProduction
    ? 'static/js/[name].[contenthash:8].js'
    : isEnvDevelopment && 'static/js/[name].js',
  // There are also additional JS chunk files if you use code splitting.
  chunkFilename: isEnvProduction
    ? 'static/js/[name].[contenthash:8].chunk.js'
    : isEnvDevelopment && 'static/js/[name].chunk.js',
```