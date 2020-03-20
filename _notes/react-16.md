# React 16 new features


## Context , ContextType
Context 提供了类似全局变量的共能， 使得数据可以改在组件树中可以跨级传递
缺点是：组件会失去独立性，对祖先组件产生依赖，难以复用
可以嵌套多个Context， 顺序无所谓

ContextType 是Context Consumer的语法糖


## Lazy + Suspend
- webpack Code splitting
- 异步import 
```
  import('./about').then()
```
## memo