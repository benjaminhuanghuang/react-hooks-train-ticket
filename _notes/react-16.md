# React 16 new features


## Context , ContextType
Context 提供了类似全局变量的共能， 使得数据可以改在组件树中可以跨级传递
缺点是：组件会失去独立性，对祖先组件产生依赖，难以复用
可以嵌套多个Context， 顺序无所谓

ContextType 是Context Consumer的语法糖


## Lazy + Suspend
- webpack Code splitting
```
  const About = lazy(()=>import(/* webpackChunkName: "about"*/'./About'))
```

- 利用异步import功能
```
  import('./about').then()
```

- Error handling
```
  // Error handling method 1
  componentDidCatch(){
    this.setState({
      hasError: true
    })
  }

  // Error handling method 2
  static getDerivedStateFromError(){
    return {
      hasError: true
    }
  }
```

## memo
PureComponent compares the props, it  can not handle object updating in this.props
function compoent 没有this.props可供比较，因此要使用memo


## Hooks (2018 React v16.8)
- No this problem

### State hook


### Effect hooks


### Context hooks

### Callback hooks


### Ref hooks






